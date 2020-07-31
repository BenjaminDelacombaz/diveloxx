import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiveSiteEditPageRoutingModule } from './dive-site-edit-routing.module';

import { DiveSiteEditPage } from './dive-site-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiveSiteEditPageRoutingModule
  ],
  declarations: [DiveSiteEditPage]
})
export class DiveSiteEditPageModule {}
