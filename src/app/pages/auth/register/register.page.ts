import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/services/error/error.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  private registerForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router,
    private translate: TranslateService,
  ) {
    // Init form
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  async submit(): Promise<void> {
    // Check if form is valid
    if (this.registerForm.valid) {
      try {
        // Create the user
        await this.authService.register(this.registerForm.value.email, this.registerForm.value.password)
        // Go to home
        this.router.navigate([''])
      } catch (error) {
        // Display error toast
        ;(await this.toastController.create({
          message: this.translate.instant('auth.register-fail'),
          duration: 5000,
          color: 'danger',
        })).present()
      }
    } else {
      // Mark all input as touched for displaying all errors
      this.registerForm.markAllAsTouched()
      // Display error toast
      ;(await this.toastController.create({
        message: this.translate.instant('form.invalid'),
        duration: 5000,
        color: 'danger',
      })).present()
    }
  }
}
