import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/services/error/error.service';
import { ToastController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { DiverService } from 'src/app/services/diver/diver.service';
import { Diver, DiverInterface } from 'src/app/models/diver.model';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-diver-edit',
  templateUrl: './diver-edit.page.html',
  styleUrls: ['./diver-edit.page.scss'],
})
export class DiverEditPage implements OnInit {

  private diverForm: FormGroup
  private myProfile: boolean
  private diver: Diver
  public diverId: string

  constructor(
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private toastController: ToastController,
    private router: Router,
    private diverService: DiverService,
    private authService: AuthService,
    private translate: TranslateService,
    private navController: NavController,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
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
    this.myProfile = this.router.url.includes('/my-profile')
    // Get diver id
    this.diverId = this.route.snapshot.paramMap.get('id')
  }

  async ngOnInit() {
    // If diver id is provided
    if (this.diverId) {
      this.diverService.getDiver(this.diverId).subscribe(diver => {
        this.diver = diver
        this.diverForm.setValue({
          email: diver.email,
          firstname: diver.firstname,
          lastname: diver.lastname,
          phone: diver.phone,
          birthdate: this.datePipe.transform(diver.birthdate.toDate(), 'yyyy-MM-dd'),
        })
      })
    } else {
      // If my profile creation set the email from the auth user
      if (this.myProfile) {
        this.diverForm.controls.email.setValue((await this.authService.getUser().toPromise()).email)
      }
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
        let diver$: Observable<Diver> = await this.diverService.create({ email: this.diverForm.value.email, firstname: this.diverForm.value.firstname, lastname: this.diverForm.value.lastname, phone: this.diverForm.value.phone, birthdate: birthdate, uid: uid, id: null })
        let diver: Diver = await diver$.toPromise()
          // Display success message
          ; (await this.toastController.create({
            message: this.translate.instant('editDiverPage.create-success', { diver: diver }),
            duration: 5000,
            color: 'success',
          })).present()
        if (this.myProfile) {
          this.navController.navigateRoot([''])
        } else {
          // Go back
          this.navController.back()
        }
      } catch (error) {
        // Display error toast
        ; (await this.toastController.create({
          message: this.translate.instant('editDiverPage.create-fail'),
          duration: 5000,
          color: 'danger',
        })).present()
      }
    } else {
      // Mark all input as touched for displaying all errors
      this.diverForm.markAllAsTouched()
        // Display error toast
        ; (await this.toastController.create({
          message: this.translate.instant('form.invalid'),
          duration: 5000,
          color: 'danger',
        })).present()
    }
  }

}
