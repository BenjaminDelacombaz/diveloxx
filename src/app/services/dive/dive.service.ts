import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DiveInterface, Dive } from 'src/app/models/dive.model';
import { map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DiverService } from '../diver/diver.service';
import { DiveSiteService } from '../dive-site/dive-site.service';
import { Diver } from 'src/app/models/diver.model';

@Injectable({
  providedIn: 'root'
})
export class DiveService {

  private docPath: string = '/dives'

  public visibilities: Array<{ name, value }> = [
    { name: 'veryBad', value: 1 },
    { name: 'bad', value: 2 },
    { name: 'medium', value: 3 },
    { name: 'good', value: 4 },
    { name: 'veryGood', value: 5 },
  ]

  constructor(
    private angularFirestore: AngularFirestore,
    private diverService: DiverService,
    private diveSiteService: DiveSiteService,
  ) { }

  getDives(): Observable<Dive[]> {
    return this.angularFirestore
      .collection<DiveInterface>(this.docPath, ref => ref.where('owner_id', '==', this.diverService.currentDiver.id).orderBy('date', 'desc'))
      .valueChanges()
      .pipe(
        map((divesI: DiveInterface[]) => divesI.map(dive => this.interfaceToClass(dive)))
      )
  }

  getDive(docId: string) {
    return this.angularFirestore
      .doc<any>(`${this.docPath}/${docId}`)
      .valueChanges()
      .pipe(
        map((diveI) => {
          return diveI ? this.interfaceToClass(diveI) : null
        })
      )
  }

  async create(diveI: DiveInterface): Promise<Observable<Dive>> {
    let docId: string = this.angularFirestore.createId()
    // Set id
    diveI.id = docId
    // Set owner id
    if (!diveI.owner_id) {
      diveI.owner_id = this.diverService.currentDiver.id
    }
    await this.angularFirestore.doc<DiveInterface>(`${this.docPath}/${docId}`).set(diveI)
    return this.getDive(docId).pipe(first())
  }

  async update(docId: string, diveSiteI: Partial<DiveInterface>): Promise<Observable<Dive>> {
    await this.angularFirestore.doc<DiveInterface>(`${this.docPath}/${docId}`).update(diveSiteI)
    return this.getDive(docId).pipe(first())
  }

  private interfaceToClass(diveI: DiveInterface): Dive {
    if (diveI) {
      let dive: Dive = new Dive(diveI)
      dive.dive_site = this.diveSiteService.getDiveSite(diveI.dive_site_id)
      dive.divers = this.diverService.getDiversById(diveI.divers_id)
      return dive
    }
    return null
  }

  visibilityValueToName(value: number): string {
    let filteredVisibilities = this.visibilities.filter(visibility => visibility.value === value)
    return filteredVisibilities[0].name
  }

  async createForBuddies(diveI: DiveInterface) {
    for (let diverId of diveI.divers_id) {
      let diver: Diver = await this.diverService.getDiver(diverId).pipe(first()).toPromise()
      // If diver is found and has an uid prepare the dive
      if (diver && diver.uid) {
        let newDiveI: DiveInterface = diveI
        // Set accepted to false
        newDiveI.accepted = false
        // Change the owner
        newDiveI.owner_id = diver.id
        // Replace the new owner with the initial diver in divers
        let index = diveI.divers_id.indexOf(diver.id);
        if (~index) {
          newDiveI.divers_id[index] = diveI.owner_id;
        }
        await this.create(newDiveI)
      }
    }
  }

  async acceptDive(accept: boolean, dive: Dive): Promise<Observable<Dive>> {
    if (accept) {
      return this.update(dive.id, {accepted: true})
    } else {
      await this.delete(dive)
      return null
    }
  }

  delete(dive: Dive) {
    return this.angularFirestore.doc<DiveInterface>(`${this.docPath}/${dive.id}`).delete()
  }
}
