import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DiveSite, DiveSiteInterface } from 'src/app/models/dive-site.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiveSiteService {

  private docPath: string = '/dive-sites'

  constructor(
    private angularFirestore: AngularFirestore,
  ) { }

  getDiveSites(): Observable<DiveSite[]> {
    return this.angularFirestore
      .collection<DiveSiteInterface>(this.docPath)
      .valueChanges()
      .pipe(
        map((diveSitesI: DiveSiteInterface[]) => diveSitesI.map(diveSiteI => new DiveSite(diveSiteI)))
      )
  }
}
