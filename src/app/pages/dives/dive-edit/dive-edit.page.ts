import { Component, OnInit } from '@angular/core';
import { DiveInterface } from 'src/app/models/dive.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ErrorService } from 'src/app/services/error/error.service';
import { ToastController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DiveSiteService } from 'src/app/services/dive-site/dive-site.service';
import { TranslateService } from '@ngx-translate/core';
import { DiveService } from 'src/app/services/dive/dive.service';
import { DiveSite } from 'src/app/models/dive-site.model';
import { DiverService } from 'src/app/services/diver/diver.service';
import { Diver } from 'src/app/models/diver.model';
import * as firebase from 'firebase';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dive-edit',
  templateUrl: './dive-edit.page.html',
  styleUrls: ['./dive-edit.page.scss'],
})
export class DiveEditPage implements OnInit {

  private diveForm: FormGroup
  public diveId: string
  public diveSites: DiveSite[]
  public divers: Diver[]

  constructor(
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private toastController: ToastController,
    public diveService: DiveService,
    private translate: TranslateService,
    private navController: NavController,
    private route: ActivatedRoute,
    private diveSiteService: DiveSiteService,
    private diverService: DiverService,
    private datePipe: DatePipe,
  ) {
    // Init form
    this.diveForm = this.formBuilder.group({
      comments: [''],
      date: ['', Validators.required],
      depth: ['', Validators.required],
      dive_site_id: ['', Validators.required],
      duration: ['', Validators.required],
      temperature: ['', Validators.required],
      visibility: ['', Validators.required],
      divers_id: [''],
    })

    // Get dive site id
    this.diveId = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    // Set dive sites
    this.diveSiteService.getDiveSites().subscribe(diveSites => this.diveSites = diveSites)
    // Set divers
    this.diverService.getDivers(true).subscribe(divers => this.divers = divers)
    // If dive id is provided
    if (this.diveId) {
      this.diveService.getDive(this.diveId).subscribe(dive => {
        this.diveForm.setValue({
          comments: dive.comments,
          date: this.datePipe.transform(dive.date.toDate(), 'yyyy-MM-dd HH:mm'),
          depth: dive.depth,
          dive_site_id: dive.dive_site_id,
          duration: dive.duration,
          temperature: dive.temperature,
          visibility: dive.visibility,
          divers_id: dive.divers_id,
        })
      })
    }
  }

  async submit(): Promise<void> {
    // Check if form is valid
    if (this.diveForm.valid) {
      if (this.diveId) {
        this.edit()
      } else {
        this.create()
      }
    } else {
      // Mark all input as touched for displaying all errors
      this.diveForm.markAllAsTouched()
        // Display error toast
        ; (await this.toastController.create({
          message: this.translate.instant('form.invalid'),
          duration: 5000,
          color: 'danger',
        })).present()
    }
  }

  async create() {
    try {
      // Convert the birthdate
      let date = firebase.firestore.Timestamp.fromDate(new Date(this.diveForm.value.date))
      // Create the dive
      await this.diveService.create({ dive_site_id: this.diveForm.value.dive_site_id, date: date, depth: this.diveForm.value.depth, duration: this.diveForm.value.duration, temperature: this.diveForm.value.temperature, visibility: this.diveForm.value.visibility, divers_id: this.diveForm.value.divers_id, comments: this.diveForm.value.comments, id: null, owner_id: null })
        // Display success message
        ; (await this.toastController.create({
          message: this.translate.instant('diveEditPage.create-success'),
          duration: 5000,
          color: 'success',
        })).present()

      this.navController.back()
    } catch (error) {
      // Display error toast
      ; (await this.toastController.create({
        message: this.translate.instant('diveEditPage.create-fail'),
        duration: 5000,
        color: 'danger',
      })).present()
    }
  }

  async edit() {
    try {
      // Get only dirty value
      let dirtyValues: Partial<DiveInterface> = {}
      for (const controlName of Object.keys(this.diveForm.controls)) {
        const control: AbstractControl = this.diveForm.controls[controlName]
        if (control.dirty) {
          dirtyValues[controlName] = control.value
        }
      }
      // Convert the date
      if (dirtyValues.date) {
        dirtyValues.date = dirtyValues.date ? firebase.firestore.Timestamp.fromDate(new Date(this.diveForm.value.date)) : null
      }
      await this.diveService.update(this.diveId, dirtyValues)
        // Display success message
        ; (await this.toastController.create({
          message: this.translate.instant('diveEditPage.update-success'),
          duration: 5000,
          color: 'success',
        })).present()
      // Go back
      this.navController.back()
    } catch (error) {
      // Display error toast
      ; (await this.toastController.create({
        message: this.translate.instant('diveEditPage.update-fail'),
        duration: 5000,
        color: 'danger',
      })).present()
    }
  }

}
