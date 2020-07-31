import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiveSiteShowPage } from './dive-site-show.page';

const routes: Routes = [
  {
    path: '',
    component: DiveSiteShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiveSiteShowPageRoutingModule {}
