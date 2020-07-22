import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/services/error/error.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DiverService } from 'src/app/services/diver/diver.service';
import { Diver } from 'src/app/models/diver.model';
import { first } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  loginForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private authService: AuthService,
    private diverService: DiverService,
    private toastController: ToastController,
    private router: Router,
    private translate: TranslateService,
  ) {
    // Init form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  async submit(): Promise<void> {
    // Check if form is valid
    if (this.loginForm.valid) {
      try {
        // Login the user
        await this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        // Go to home
        this.router.navigate([''])
      } catch (error) {
        // Display error toast
        ;(await this.toastController.create({
          message: this.translate.instant('auth.login-fail'),
          duration: 5000,
          color: 'danger',
        })).present()
      }
    } else {
      // Mark all input as touched for displaying all errors
      this.loginForm.markAllAsTouched()
      // Display error toast
      ;(await this.toastController.create({
        message: this.translate.instant('form.invalid'),
        duration: 5000,
        color: 'danger',
      })).present()
    }
  }
}
