import { Component, OnInit } from '@angular/core';
import { DiverService } from 'src/app/services/diver/diver.service';
import { Observable } from 'rxjs';
import { Diver } from 'src/app/models/diver.model';

@Component({
  selector: 'app-diver-index',
  templateUrl: './diver-index.page.html',
  styleUrls: ['./diver-index.page.scss'],
})
export class DiverIndexPage implements OnInit {

  public divers$: Observable<Diver[]>

  constructor(
    private diverService: DiverService
  ) { }

  ngOnInit() {
    this.divers$ = this.diverService.getDivers(true)
  }

}
