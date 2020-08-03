import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dive-site-select-location-map-modal',
  templateUrl: './dive-site-select-location-map-modal.page.html',
  styleUrls: ['./dive-site-select-location-map-modal.page.scss'],
})
export class DiveSiteSelectLocationMapModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss()
  }

}
