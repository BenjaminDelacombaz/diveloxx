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

}
