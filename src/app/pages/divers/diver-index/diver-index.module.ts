import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiverIndexPageRoutingModule } from './diver-index-routing.module';

import { DiverIndexPage } from './diver-index.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiverIndexPageRoutingModule
  ],
  declarations: [DiverIndexPage]
})
export class DiverIndexPageModule {}
