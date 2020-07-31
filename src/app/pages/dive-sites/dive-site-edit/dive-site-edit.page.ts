import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DiveSite } from 'src/app/models/dive-site.model';
import { TranslateService } from '@ngx-translate/core';
import { DiveSiteService } from 'src/app/services/dive-site/dive-site.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { ErrorService } from 'src/app/services/error/error.service';

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
  ) {
    // Init form
    this.diveSiteForm = this.formBuilder.group({
      name: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
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
}
