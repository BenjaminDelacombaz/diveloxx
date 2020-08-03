import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiveEditPageRoutingModule } from './dive-edit-routing.module';

import { DiveEditPage } from './dive-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiveEditPageRoutingModule
  ],
  declarations: [DiveEditPage]
})
export class DiveEditPageModule {}
