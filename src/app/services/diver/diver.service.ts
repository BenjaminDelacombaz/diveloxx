import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { map, first, flatMap, filter } from 'rxjs/operators';
import { Diver, DiverInterface } from 'src/app/models/diver.model';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DiverService {

  private docPath: string = '/divers'

  constructor(
    private angularFireStore: AngularFirestore,
    private authService: AuthService,
  ) { }

  getDiver(docId: string) {
    return this.angularFireStore
      .doc<DiverInterface>(`${this.docPath}/${docId}`)
      .valueChanges()
      .pipe(
        map((diverI: DiverInterface) => {
          if (diverI) {
            diverI.id = docId
            return new Diver(diverI)
          }
          return null
        }),
        first()
      )
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

  async update(docId: string, diverI: Partial<DiverInterface>): Promise<Observable<Diver>> {
    await this.angularFireStore.doc<Diver>(`${this.docPath}/${docId}`).update(diverI)
    return this.getDiver(docId)
  }

  getDivers(withoutCurrentUser: boolean = false): Observable<Diver[]> {
    return this.angularFireStore
      .collection<DiverInterface>(this.docPath)
      .snapshotChanges()
      .pipe(map((rawDivers: DocumentChangeAction<DiverInterface>[]) => {
        let divers: Diver[] = rawDivers.map(this.documentToDiver)
        if (withoutCurrentUser) {
          divers = divers.filter(diver => diver.uid != this.authService.currentUser.uid)
        }
        return divers
      }))
  }

  private documentToDiver(doc: DocumentChangeAction<DiverInterface>) {
    let diver: DiverInterface = doc.payload.doc.data()
    diver.id = doc.payload.doc.id
    return new Diver(diver)
  }
}
