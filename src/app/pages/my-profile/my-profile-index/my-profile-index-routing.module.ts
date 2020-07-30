import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyProfileIndexPage } from './my-profile-index.page';

const routes: Routes = [
  {
    path: '',
    component: MyProfileIndexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyProfileIndexPageRoutingModule {}
