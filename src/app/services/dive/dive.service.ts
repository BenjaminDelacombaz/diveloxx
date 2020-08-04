import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DiveInterface, Dive } from 'src/app/models/dive.model';
import { map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DiverService } from '../diver/diver.service';

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
  ) { }

  getDive(docId: string) {
    return this.angularFirestore
      .doc<DiveInterface>(`${this.docPath}/${docId}`)
      .valueChanges()
      .pipe(
        map((dive: DiveInterface) => {
          return dive ? new Dive(dive) : null
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
}
