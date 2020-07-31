import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiveSiteShowPageRoutingModule } from './dive-site-show-routing.module';

import { DiveSiteShowPage } from './dive-site-show.page';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiveSiteShowPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [DiveSiteShowPage]
})
export class DiveSiteShowPageModule {}
