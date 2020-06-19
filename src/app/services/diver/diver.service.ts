import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Diver, DiverInterface } from 'src/app/models/diver.model';

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
      .pipe(map((diver: DiverInterface) => new Diver(diver)))
  }
}
