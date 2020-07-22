import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/services/error/error.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DiverService } from 'src/app/services/diver/diver.service';
import { Diver, DiverInterface } from 'src/app/models/diver.model';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-diver-edit',
  templateUrl: './diver-edit.page.html',
  styleUrls: ['./diver-edit.page.scss'],
})
export class DiverEditPage implements OnInit {

  private diverForm: FormGroup
  private myProfile: boolean

  constructor(
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private toastController: ToastController,
    private router: Router,
    private diverService: DiverService,
    private authService: AuthService,
    private translate: TranslateService,
  ) {
    // Init form
    this.diverForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: [''],
      birthdate: [''],
    })

    // Detect if the user create/edit his diver
    this.myProfile = router.url.includes('/my-profile')
  }

  async ngOnInit() {
    if (this.myProfile) {
      this.diverForm.controls.email.setValue((await  this.authService.getUser().toPromise()).email)
    }
  }

  async submit(): Promise<void> {
    // Check if form is valid
    if (this.diverForm.valid) {
      try {
        // Set uid if user create his profile
        let uid: string = this.myProfile ? (await this.authService.getUser().toPromise()).uid : null
        // Convert the birthdate
        let birthdate = this.diverForm.value.birthdate ? firebase.firestore.Timestamp.fromDate(new Date(this.diverForm.value.birthdate)) : null
        // Create the diver
        let diver$: Observable<Diver> = await this.diverService.create({email: this.diverForm.value.email, firstname: this.diverForm.value.firstname, lastname: this.diverForm.value.lastname, phone: this.diverForm.value.phone, birthdate: birthdate, uid: uid})
        let diver: Diver = await diver$.toPromise()
        // Display success message
        ;(await this.toastController.create({
          message: this.translate.instant('editDiverPage.create-success', {diver: diver}),
          duration: 5000,
          color: 'success',
        })).present()
        // Go to home
        this.router.navigate([''])
      } catch (error) {
        // Display error toast
        ;(await this.errorService.getErrorMsgToast(this.errorService.AUTH_TYPE, 'diver-create-fail')).present()
      }
    } else {
      // Mark all input as touched for displaying all errors
      this.diverForm.markAllAsTouched()
      // Display error toast
      ;(await this.errorService.getErrorMsgToast(this.errorService.FORM_TYPE, 'invalid')).present()
    }
  }

}
