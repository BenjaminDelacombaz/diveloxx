import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiveSiteSelectLocationMapModalPage } from './dive-site-select-location-map-modal.page';

import { TranslateModule } from '@ngx-translate/core';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    GoogleMapsModule,
  ],
  declarations: [DiveSiteSelectLocationMapModalPage]
})
export class DiveSiteSelectLocationMapModalPageModule {}
