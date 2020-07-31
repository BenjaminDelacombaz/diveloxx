import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiverShowPageRoutingModule } from './diver-show-routing.module';

import { DiverShowPage } from './diver-show.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiverShowPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [DiverShowPage]
})
export class DiverShowPageModule {}
