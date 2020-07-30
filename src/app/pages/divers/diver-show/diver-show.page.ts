import { Component, OnInit } from '@angular/core';
import { DiverService } from 'src/app/services/diver/diver.service';
import { Observable } from 'rxjs';
import { Diver } from 'src/app/models/diver.model';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-diver-show',
  templateUrl: './diver-show.page.html',
  styleUrls: ['./diver-show.page.scss'],
})
export class DiverShowPage implements OnInit {

  public diver: Diver
  public diverId: string
  public canUpdate: boolean = false

  constructor(
    private diverService: DiverService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.diverId = this.route.snapshot.paramMap.get('id')
    this.diverService.getDiver(this.diverId).subscribe(diver => {
      this.diver = diver
      this.canUpdate = this.diverService.currentDiver.canUpdate(diver)
    })
  }

}
