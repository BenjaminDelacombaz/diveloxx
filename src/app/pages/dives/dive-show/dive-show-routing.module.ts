import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiveShowPage } from './dive-show.page';

const routes: Routes = [
  {
    path: '',
    component: DiveShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiveShowPageRoutingModule {}
