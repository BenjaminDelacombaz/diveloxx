import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { map, first, flatMap, filter } from 'rxjs/operators';
import { Diver, DiverInterface } from 'src/app/models/diver.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiverService {

  private docPath: string = '/divers'

  constructor(private angularFireStore: AngularFirestore) { }

  getDiver(docId: string) {
    return this.angularFireStore
      .doc<Diver>(`${this.docPath}/${docId}`)
      .valueChanges()
      .pipe(map((diver: DiverInterface) => diver ? new Diver(diver) : null), first())
  }

  getDiverByUid(uid: string): Observable<Diver> {
    return this.angularFireStore
      .collection<Diver>(this.docPath, ref => ref.where('uid', '==', uid).limit(1))
      .valueChanges()
      .pipe(
        flatMap(divers => divers.length ? divers : of(null)),
        map((diver: DiverInterface) => diver ? new Diver(diver) : null),
        first()
      )
  }

  async create(diverInterface: DiverInterface): Promise<Observable<Diver>> {
    let docId: string = this.angularFireStore.createId()
    await this.angularFireStore.doc<Diver>(`${this.docPath}/${docId}`).set(diverInterface)
    return this.getDiver(docId)
  }

  getDivers(): Observable<Diver[]> {
    return this.angularFireStore
      .collection<DiverInterface>(this.docPath)
      .snapshotChanges()
      .pipe(map((divers: DocumentChangeAction<DiverInterface>[]) => divers.map(this.documentToDiver)))
  }

  private documentToDiver(doc: DocumentChangeAction<DiverInterface>) {
    let diver: DiverInterface = doc.payload.doc.data()
    return new Diver(diver)
  }
}
