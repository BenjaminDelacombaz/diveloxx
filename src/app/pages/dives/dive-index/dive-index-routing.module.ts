import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiveIndexPage } from './dive-index.page';

const routes: Routes = [
  {
    path: '',
    component: DiveIndexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiveIndexPageRoutingModule {}
