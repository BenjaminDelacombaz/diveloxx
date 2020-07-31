import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiveSiteEditPageRoutingModule } from './dive-site-edit-routing.module';

import { DiveSiteEditPage } from './dive-site-edit.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiveSiteEditPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ],
  declarations: [DiveSiteEditPage]
})
export class DiveSiteEditPageModule {}
