import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DiveSite, DiveSiteInterface } from 'src/app/models/dive-site.model';
import { TranslateService } from '@ngx-translate/core';
import { DiveSiteService } from 'src/app/services/dive-site/dive-site.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, NavController, ModalController } from '@ionic/angular';
import { ErrorService } from 'src/app/services/error/error.service';
import * as firebase from 'firebase'
import { Observable } from 'rxjs';
import { DiveSiteSelectLocationMapModalPage } from 'src/app/components/dive-site-select-location-map-modal/dive-site-select-location-map-modal.page';

@Component({
  selector: 'app-dive-site-edit',
  templateUrl: './dive-site-edit.page.html',
  styleUrls: ['./dive-site-edit.page.scss'],
})
export class DiveSiteEditPage implements OnInit {

  private diveSiteForm: FormGroup
  private diveSite: DiveSite
  public diveSiteId: string

  constructor(
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private toastController: ToastController,
    private router: Router,
    private diveSiteService: DiveSiteService,
    private translate: TranslateService,
    private navController: NavController,
    private route: ActivatedRoute,
    private modalController: ModalController,
  ) {
    // Init form
    this.diveSiteForm = this.formBuilder.group({
      name: ['', Validators.required],
      longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
      latitude: ['',[Validators.required, Validators.min(-90), Validators.max(90)]],
      difficulty: ['', Validators.required],
      water_type: ['', Validators.required],
      description: ['', Validators.required],
    })

    // Get dive site id
    this.diveSiteId = this.route.snapshot.paramMap.get('id')
  }

  async ngOnInit() {
    // If dive site id is provided
    if (this.diveSiteId) {
      this.diveSiteService.getDiveSite(this.diveSiteId).subscribe(diveSite => {
        this.diveSite = diveSite
        this.diveSiteForm.setValue({
          name: diveSite.name,
          longitude: diveSite.location.longitude,
          latitude: diveSite.location.latitude,
          difficulty: diveSite.difficulty,
          water_type: diveSite.water_type,
          description: diveSite.description,
        })
      })
    }
  }

  async submit(): Promise<void> {
    // Check if form is valid
    if (this.diveSiteForm.valid) {
      if (this.diveSiteId) {
        this.edit()
      } else {
        this.create()
      }
    } else {
      // Mark all input as touched for displaying all errors
      this.diveSiteForm.markAllAsTouched()
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
      // Convert the longitude / latitude
      let location = new firebase.firestore.GeoPoint(this.diveSiteForm.value.latitude, this.diveSiteForm.value.longitude)
      // Create the dive site
      let diveSite$: Observable<DiveSite> = await this.diveSiteService.create({ name: this.diveSiteForm.value.name, location: location, difficulty: Number(this.diveSiteForm.value.difficulty), water_type: Number(this.diveSiteForm.value.water_type), description: this.diveSiteForm.value.description, id: null, owner_id: null })
      let diveSite: DiveSite = await diveSite$.toPromise()
        // Display success message
        ; (await this.toastController.create({
          message: this.translate.instant('diveSiteEditPage.create-success', { diveSite: diveSite }),
          duration: 5000,
          color: 'success',
        })).present()
      // Go back
      this.navController.back()
    } catch (error) {
      // Display error toast
      ; (await this.toastController.create({
        message: this.translate.instant('diveSiteEditPage.create-fail'),
        duration: 5000,
        color: 'danger',
      })).present()
    }
  }
  
  async edit() {
    try {
      // Get only dirty value
      let dirtyValues: Partial<DiveSiteInterface> = {}
      for (const controlName of Object.keys(this.diveSiteForm.controls)) {
        const control: AbstractControl = this.diveSiteForm.controls[controlName]
        if (control.dirty) {
          dirtyValues[controlName] = control.value
        }
      }
      // Convert the latitude / longitude
      if (this.diveSiteForm.controls.latitude.dirty || this.diveSiteForm.controls.longitude.dirty) {
        dirtyValues.location = new firebase.firestore.GeoPoint(this.diveSiteForm.value.latitude, this.diveSiteForm.value.longitude)
        delete dirtyValues['longitude']
        delete dirtyValues['latitude']
      }
      let diveSite$: Observable<DiveSite> = await this.diveSiteService.update(this.diveSiteId, dirtyValues)
      let diveSite: DiveSite = await diveSite$.toPromise()
        // Display success message
        ; (await this.toastController.create({
          message: this.translate.instant('diveSiteEditPage.update-success', { diveSite: diveSite }),
          duration: 5000,
          color: 'success',
        })).present()
      // Go back
      this.navController.back()
    } catch (error) {
      // Display error toast
      ; (await this.toastController.create({
        message: this.translate.instant('diveSiteEditPage.update-fail'),
        duration: 5000,
        color: 'danger',
      })).present()
    }
  }

  async presentMapModal() {
    let diveSiteLocation: google.maps.LatLng = null
    if(this.diveSiteForm.value.latitude !== '' && this.diveSiteForm.value.latitude !== '') {
      diveSiteLocation = new google.maps.LatLng(this.diveSiteForm.value.latitude, this.diveSiteForm.value.longitude)
    }
    const modal = await this.modalController.create({
      component: DiveSiteSelectLocationMapModalPage,
      componentProps: {
        diveSiteLocation: diveSiteLocation
      }
    })
    modal.onDidDismiss().then(data => {
      if (data.data && data.data['diveSiteLocation']) {
        let diveDiteMapLocation: google.maps.LatLng = data.data['diveSiteLocation']
        this.diveSiteForm.controls.latitude.setValue(diveDiteMapLocation.lat())
        this.diveSiteForm.controls.longitude.setValue(diveDiteMapLocation.lng())
      }
    })
    return await modal.present()
  }
}
