import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/services/error/error.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DiverService } from 'src/app/services/diver/diver.service';
import { Diver } from 'src/app/models/diver.model';
import { first } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

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
        let userCredential: firebase.auth.UserCredential = await this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        // Get the diver
        let diver: Diver = await this.diverService.getDiver(userCredential.user.uid).toPromise()
        // Display success message
        ;(await this.toastController.create({
          message: `Connexion réussie, Bonjour ${diver}`,
          duration: 5000,
          color: 'success',
        })).present()
        // Go to home
        this.router.navigate([''])
      } catch (error) {
        // Display error toast
        ;(await this.errorService.getErrorMsgToast(this.errorService.AUTH_TYPE, error.code)).present()
      }
    } else {
      // Mark all input as touched for displaying all errors
      this.loginForm.markAllAsTouched()
      // Display error toast
      ;(await this.errorService.getErrorMsgToast(this.errorService.FORM_TYPE, 'invalid')).present()
    }
  }
}
