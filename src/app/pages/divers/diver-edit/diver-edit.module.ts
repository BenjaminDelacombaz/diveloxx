import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiverEditPageRoutingModule } from './diver-edit-routing.module';

import { DiverEditPage } from './diver-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiverEditPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [DiverEditPage]
})
export class DiverEditPageModule {}
