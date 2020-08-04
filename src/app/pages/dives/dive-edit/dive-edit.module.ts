import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiveEditPageRoutingModule } from './dive-edit-routing.module';

import { DiveEditPage } from './dive-edit.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiveEditPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ],
  declarations: [DiveEditPage]
})
export class DiveEditPageModule {}
