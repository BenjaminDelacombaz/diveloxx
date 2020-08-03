import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiveSiteIndexPageRoutingModule } from './dive-site-index-routing.module';

import { DiveSiteIndexPage } from './dive-site-index.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiveSiteIndexPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [DiveSiteIndexPage]
})
export class DiveSiteIndexPageModule {}
