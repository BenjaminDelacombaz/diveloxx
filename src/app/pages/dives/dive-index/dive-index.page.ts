import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dive } from 'src/app/models/dive.model';
import { DiveService } from 'src/app/services/dive/dive.service';

@Component({
  selector: 'app-dive-index',
  templateUrl: './dive-index.page.html',
  styleUrls: ['./dive-index.page.scss'],
})
export class DiveIndexPage implements OnInit {

  public dives$: Observable<Dive[]>
  public divesCount: number

  constructor(
    private diveService: DiveService,
  ) { }

  ngOnInit() {
    this.dives$ = this.diveService.getDives()
    this.dives$.subscribe(dives => {
      this.divesCount = dives.length
    })
  }

}
