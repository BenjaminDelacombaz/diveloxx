import { Component, OnInit } from '@angular/core';
import { Dive } from 'src/app/models/dive.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/services/error/error.service';
import { ToastController, NavController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { DiveSiteService } from 'src/app/services/dive-site/dive-site.service';
import { TranslateService } from '@ngx-translate/core';
import { DiveService } from 'src/app/services/dive/dive.service';
import { DiveSite } from 'src/app/models/dive-site.model';
import { DiverService } from 'src/app/services/diver/diver.service';
import { Diver } from 'src/app/models/diver.model';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dive-edit',
  templateUrl: './dive-edit.page.html',
  styleUrls: ['./dive-edit.page.scss'],
})
export class DiveEditPage implements OnInit {

  private diveForm: FormGroup
  private dive: Dive
  public diveId: string
  public diveSites: DiveSite[]
  public divers: Diver[]

  constructor(
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private toastController: ToastController,
    private router: Router,
    public diveService: DiveService,
    private translate: TranslateService,
    private navController: NavController,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private diveSiteService: DiveSiteService,
    private diverService: DiverService,
  ) {
    // Init form
    this.diveForm = this.formBuilder.group({
      comments: [''],
      date: ['', Validators.required],
      depth: ['', Validators.required],
      dive_site: ['', Validators.required],
      duration: ['', Validators.required],
      temperature: ['', Validators.required],
      visibility: ['', Validators.required],
      divers: [''],
    })

    // Get dive site id
    this.diveId = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    // Set dive sites
    this.diveSiteService.getDiveSites().subscribe(diveSites => this.diveSites = diveSites)
    // Set divers
    this.diverService.getDivers(true).subscribe(divers => this.divers = divers)
  }

  async submit(): Promise<void> {
    // Check if form is valid
    if (this.diveForm.valid) {
      if (this.diveId) {
        // Edit
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
      let dive$: Observable<Dive> = await this.diveService.create({ dive_site_id: this.diveForm.value.dive_site, date: date, depth: this.diveForm.value.depth, duration: this.diveForm.value.duration, temperature: this.diveForm.value.temperature, visibility: this.diveForm.value.visibility, divers_id: this.diveForm.value.divers, comments: this.diveForm.value.comments, id: null, owner_id: null })
      let dive: Dive = await dive$.toPromise()
        // Display success message
        ; (await this.toastController.create({
          message: this.translate.instant('diveEditPage.create-success', { dive: dive }),
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

}
