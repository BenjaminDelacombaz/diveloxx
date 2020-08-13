import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiveShowPageRoutingModule } from './dive-show-routing.module';

import { DiveShowPage } from './dive-show.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiveShowPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [DiveShowPage]
})
export class DiveShowPageModule {}
