import { Component, OnInit } from '@angular/core';
import { DiveSite } from 'src/app/models/dive-site.model';
import { DiveSiteService } from 'src/app/services/dive-site/dive-site.service';
import { ActivatedRoute } from '@angular/router';
import { DiverService } from 'src/app/services/diver/diver.service';

@Component({
  selector: 'app-dive-site-show',
  templateUrl: './dive-site-show.page.html',
  styleUrls: ['./dive-site-show.page.scss'],
})
export class DiveSiteShowPage implements OnInit {

  public diveSite: DiveSite
  public diveSiteId: string
  public canUpdate: boolean = false

  constructor(
    private diverService: DiverService,
    public diveSiteService: DiveSiteService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.diveSiteId = this.route.snapshot.paramMap.get('id')
    this.diveSiteService.getDiveSite(this.diveSiteId).subscribe(diveSite => {
      this.diveSite = diveSite
      this.canUpdate = this.diverService.currentDiver.canUpdate(diveSite)
    })
  }

}
