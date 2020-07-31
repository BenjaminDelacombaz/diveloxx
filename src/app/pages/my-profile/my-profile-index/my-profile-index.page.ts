import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { DiverService } from 'src/app/services/diver/diver.service';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-profile-index',
  templateUrl: './my-profile-index.page.html',
  styleUrls: ['./my-profile-index.page.scss'],
})
export class MyProfileIndexPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.logout()
    this.router.navigate(['/login'], { replaceUrl: true })
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
