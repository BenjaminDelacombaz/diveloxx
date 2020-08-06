import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiveIndexPageRoutingModule } from './dive-index-routing.module';

import { DiveIndexPage } from './dive-index.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiveIndexPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [DiveIndexPage]
})
export class DiveIndexPageModule {}
