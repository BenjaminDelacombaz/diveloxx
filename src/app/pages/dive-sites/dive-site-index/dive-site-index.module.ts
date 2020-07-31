import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiveSiteIndexPageRoutingModule } from './dive-site-index-routing.module';

import { DiveSiteIndexPage } from './dive-site-index.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiveSiteIndexPageRoutingModule
  ],
  declarations: [DiveSiteIndexPage]
})
export class DiveSiteIndexPageModule {}
