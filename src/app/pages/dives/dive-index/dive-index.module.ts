import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiveIndexPageRoutingModule } from './dive-index-routing.module';

import { DiveIndexPage } from './dive-index.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiveIndexPageRoutingModule
  ],
  declarations: [DiveIndexPage]
})
export class DiveIndexPageModule {}
