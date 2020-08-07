import { Component, OnInit } from '@angular/core';
import { Dive } from 'src/app/models/dive.model';
import { DiverService } from 'src/app/services/diver/diver.service';
import { DiveSiteService } from 'src/app/services/dive-site/dive-site.service';
import { ActivatedRoute } from '@angular/router';
import { DiveService } from 'src/app/services/dive/dive.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dive-show',
  templateUrl: './dive-show.page.html',
  styleUrls: ['./dive-show.page.scss'],
})
export class DiveShowPage implements OnInit {

  public dive: Dive
  public diveId: string
  public canUpdate: boolean = false

  constructor(
    private diveService: DiveService,
    private diveSiteService: DiveSiteService,
    private diverService: DiverService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.diveId = this.route.snapshot.paramMap.get('id')
    this.diveService.getDive(this.diveId).subscribe(dive => {
      this.dive = dive
      this.canUpdate = this.diverService.currentDiver.canUpdate(dive)
    })
  }

  test(diver) {
    this.navCtrl.navigateForward(['/divers', diver.id])
  }
}
