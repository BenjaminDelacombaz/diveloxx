import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyProfileIndexPageRoutingModule } from './my-profile-index-routing.module';

import { MyProfileIndexPage } from './my-profile-index.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyProfileIndexPageRoutingModule
  ],
  declarations: [MyProfileIndexPage]
})
export class MyProfileIndexPageModule {}
