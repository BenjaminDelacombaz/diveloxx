import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-profile-index',
  templateUrl: './my-profile-index.page.html',
  styleUrls: ['./my-profile-index.page.scss'],
})
export class MyProfileIndexPage implements OnInit {

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.logout()
    window.location.replace('/login')
  }

  async changePassword() {
    ; (await this.alertController.create({
      header: this.translateService.instant('myProfileIndexPage.confirmation'),
      message: this.translateService.instant('myProfileIndexPage.confirmationPasswordResetMessage'),
      buttons: [
        this.translateService.instant('cancel'),
        {
          text: this.translateService.instant('ok'),
          handler: () => {
            this.authService.sendPasswordReset()
            this.logOut()
          }
        }
      ]
    })).present();
  }

}
