import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DiveInterface, Dive } from 'src/app/models/dive.model';
import { map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DiverService } from '../diver/diver.service';
import { DiveSiteService } from '../dive-site/dive-site.service';

@Injectable({
  providedIn: 'root'
})
export class DiveService {

  private docPath: string = '/dives'

  public visibilities: Array<{name, value}> = [
    { name: 'veryBad', value: 1 },
    { name: 'bad', value: 2 },
    { name: 'medium', value:3 },
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
    diveI.owner_id = this.diverService.currentDiver.id
    await this.angularFirestore.doc<DiveInterface>(`${this.docPath}/${docId}`).set(diveI)
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
}
