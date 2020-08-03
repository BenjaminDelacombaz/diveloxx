import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dive-site-select-location-map-modal',
  templateUrl: './dive-site-select-location-map-modal.page.html',
  styleUrls: ['./dive-site-select-location-map-modal.page.scss'],
})
export class DiveSiteSelectLocationMapModalPage implements OnInit {

  @Input() diveSiteLocation: google.maps.LatLng

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss()
  }

  createMarker(event: google.maps.MouseEvent) {
    this.diveSiteLocation = event.latLng
  }

  async save() {
    if (this.diveSiteLocation) {
      this.modalController.dismiss({
        diveSiteLocation: this.diveSiteLocation,
      })
    } else {
      // Display error toast
      ; (await this.toastController.create({
        message: this.translate.instant('diveSiteSelectLocationMapModalComponent.noLocation'),
        duration: 5000,
        color: 'danger',
      })).present()
    }
  }

}
