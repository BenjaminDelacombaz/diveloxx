import { Component, OnInit } from '@angular/core';
import { Dive } from 'src/app/models/dive.model';
import { DiverService } from 'src/app/services/diver/diver.service';
import { DiveSiteService } from 'src/app/services/dive-site/dive-site.service';
import { ActivatedRoute } from '@angular/router';
import { DiveService } from 'src/app/services/dive/dive.service';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

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
    private toastController: ToastController,
    private translate: TranslateService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.diveId = this.route.snapshot.paramMap.get('id')
    this.diveService.getDive(this.diveId).subscribe(dive => {
      if (dive) {
        this.dive = dive
        this.canUpdate = this.diverService.currentDiver.canUpdate(dive) && dive.accepted
      } else {
        this.navCtrl.back()
      }
    })
  }

  async acceptDive(accept: boolean) {
    try {
      await this.diveService.acceptDive(accept, this.dive)
        // Display success toast
        ; (await this.toastController.create({
          message: this.translate.instant('diveShowPage.accept-success'),
          duration: 5000,
          color: 'success',
        })).present()
    } catch (error) {
      // Display error toast
      ; (await this.toastController.create({
        message: this.translate.instant('diveShowPage.accept-fail'),
        duration: 5000,
        color: 'danger',
      })).present()
    }
  }

  async presentDeleteAlert() {
    const alert = await this.alertController.create({
      header: this.translate.instant('deletionConfirmationHeader'),
      message: this.translate.instant('deletionConfirmationMessage'),
      buttons: [
        this.translate.instant('no'),
        {
          text: this.translate.instant('yes'),
          handler: () => this.delete()
        }
      ]
    });

    await alert.present();
  }

  private async delete() {
    try {
      await this.diveService.delete(this.dive)
        // Display success toast
        ; (await this.toastController.create({
          message: this.translate.instant('diveShowPage.delete-success'),
          duration: 5000,
          color: 'success',
        })).present()
    } catch (error) {
      // Display success toast
      ; (await this.toastController.create({
        message: this.translate.instant('diveShowPage.delete-fail'),
        duration: 5000,
        color: 'danger',
      })).present()
    }
  }
}
