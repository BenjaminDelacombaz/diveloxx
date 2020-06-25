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
      .pipe(map((diver: DiverInterface) => new Diver(diver)), first())
  }

  async create(uid: string, diver: Diver): Promise<Observable<Diver>> {
    await this.angularFireStore.doc<Diver>(`${this.docPath}/${uid}`).set(diver)
    return this.getDiver(uid)
  }
}
