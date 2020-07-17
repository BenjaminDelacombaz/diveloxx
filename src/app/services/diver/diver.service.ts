import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { Diver, DiverInterface } from 'src/app/models/diver.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiverService {

  private docPath: string = '/divers'

  constructor(private angularFireStore: AngularFirestore) { }

  getDiver(uid: string) {
    return this.angularFireStore
      .doc<Diver>(`${this.docPath}/${uid}`)
      .valueChanges()
      .pipe(map((diver: DiverInterface) => diver ? new Diver(diver) : null), first())
  }

  async create(diverInterface: DiverInterface, uid: string = null): Promise<Observable<Diver>> {
    let docId: string = uid ? uid : this.angularFireStore.createId()
    await this.angularFireStore.doc<Diver>(`${this.docPath}/${docId}`).set(diverInterface)
    return this.getDiver(docId)
  }
}
