import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/services/error/error.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DiverService } from 'src/app/services/diver/diver.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private diverService: DiverService,
    private toastController: ToastController,
    private router: Router,
  ) {
    // Init form
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: [''],
      birthdate: ['']
    })
  }

  async submit(): Promise<void> {
    // Check if form is valid
    if (this.registerForm.valid) {
      // Create account
    } else {
      // Mark all input as touched for displaying all errors
      this.registerForm.markAllAsTouched()
      // Display error toast
      ;(await this.errorService.getErrorMsgToast(this.errorService.FORM_TYPE, 'invalid')).present()
    }
  }
}
