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

  public currentDiver: Diver

  constructor(
    private angularFireStore: AngularFirestore,
    private authService: AuthService,
  ) {
    this.authService.getUser().subscribe(user => {
      this.getDiverByUid(user.uid).subscribe(diver => this.currentDiver = diver)
    })
  }

  getDiver(docId: string) {
    return this.angularFireStore
      .doc<DiverInterface>(`${this.docPath}/${docId}`)
      .valueChanges()
      .pipe(
        map((diverI: DiverInterface) => {
          return diverI ? new Diver(diverI) : null
        })
      )
  }

  getDiverByUid(uid: string): Observable<Diver> {
    return this.angularFireStore
      .collection<DiverInterface>(this.docPath, ref => ref.where('uid', '==', uid).limit(1))
      .valueChanges()
      .pipe(
        flatMap(divers => divers.length ? divers : of(null)),
        map(diver => diver ? new Diver(diver) : null)
      )
  }

  async create(diverInterface: DiverInterface): Promise<Observable<Diver>> {
    let docId: string = this.angularFireStore.createId()
    // Set id
    diverInterface.id = docId
    // Set owner id
    diverInterface.owner_id = this.currentDiver ? this.currentDiver.id : docId
    await this.angularFireStore.doc<Diver>(`${this.docPath}/${docId}`).set(diverInterface)
    return this.getDiver(docId).pipe(first())
  }

  async update(docId: string, diverI: Partial<DiverInterface>): Promise<Observable<Diver>> {
    await this.angularFireStore.doc<Diver>(`${this.docPath}/${docId}`).update(diverI)
    return this.getDiver(docId).pipe(first())
  }

  getDivers(withoutCurrentUser: boolean = false): Observable<Diver[]> {
    return this.angularFireStore
      .collection<DiverInterface>(this.docPath)
      .valueChanges()
      .pipe(map((diversI: DiverInterface[]) => {
        let divers: Diver[] = diversI.map(diverI => new Diver(diverI))
        if (withoutCurrentUser) {
          divers = divers.filter(diver => diver.uid != this.authService.currentUser.uid)
        }
        return divers
      }))
  }
}
