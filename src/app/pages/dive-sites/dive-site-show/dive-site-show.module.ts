import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiveSiteShowPageRoutingModule } from './dive-site-show-routing.module';

import { DiveSiteShowPage } from './dive-site-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiveSiteShowPageRoutingModule
  ],
  declarations: [DiveSiteShowPage]
})
export class DiveSiteShowPageModule {}
