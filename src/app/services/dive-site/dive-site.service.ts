import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DiveSite, DiveSiteInterface } from 'src/app/models/dive-site.model';
import { map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DiverService } from '../diver/diver.service';

@Injectable({
  providedIn: 'root'
})
export class DiveSiteService {

  private docPath: string = '/dive_sites'

  constructor(
    private angularFirestore: AngularFirestore,
    private diverService: DiverService,
  ) { }

  getDiveSites(): Observable<DiveSite[]> {
    return this.angularFirestore
      .collection<DiveSiteInterface>(this.docPath)
      .valueChanges()
      .pipe(
        map((diveSitesI: DiveSiteInterface[]) => diveSitesI.map(diveSiteI => new DiveSite(diveSiteI)))
      )
  }

  getDiveSite(docId: string) {
    return this.angularFirestore
      .doc<DiveSiteInterface>(`${this.docPath}/${docId}`)
      .valueChanges()
      .pipe(
        map((diveSite: DiveSiteInterface) => {
          return diveSite ? new DiveSite(diveSite) : null
        })
      )
  }

  async create(diveSiteI: DiveSiteInterface): Promise<Observable<DiveSite>> {
    let docId: string = this.angularFirestore.createId()
    // Set id
    diveSiteI.id = docId
    // Set owner id
    diveSiteI.owner_id = this.diverService.currentDiver.id
    await this.angularFirestore.doc<DiveSiteInterface>(`${this.docPath}/${docId}`).set(diveSiteI)
    return this.getDiveSite(docId).pipe(first())
  }
}
