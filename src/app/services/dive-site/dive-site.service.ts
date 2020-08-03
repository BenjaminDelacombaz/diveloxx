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

  public difficulties: Array<{name, value}> = [
    { name: 'veryEasy', value: 1 },
    { name: 'easy', value: 2 },
    { name: 'medium', value: 3 },
    { name: 'hard', value: 4 },
    { name: 'veryHard', value: 5 },
  ]

  public waterTypes: Array<{name, value}> = [
    { name: 'sea', value: 1 },
    { name: 'lake', value: 2 },
    { name: 'cave', value: 3 },
    { name: 'river', value: 4 },
  ]


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

  async update(docId: string, diveSiteI: Partial<DiveSiteInterface>): Promise<Observable<DiveSite>> {
    await this.angularFirestore.doc<DiveSiteInterface>(`${this.docPath}/${docId}`).update(diveSiteI)
    return this.getDiveSite(docId).pipe(first())
  }

  difficultyValueToName(value: number): string {
    let filteredDifficulties = this.difficulties.filter(difficulty => difficulty.value === value)
    return filteredDifficulties[0].name
  }

  waterTypeValueToName(value: number): string {
    let filteredWaterTypes = this.waterTypes.filter(waterType => waterType.value === value)
    return filteredWaterTypes[0].name
  }
}
