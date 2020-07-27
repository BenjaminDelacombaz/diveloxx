import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiverIndexPage } from './diver-index.page';

const routes: Routes = [
  {
    path: '',
    component: DiverIndexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiverIndexPageRoutingModule {}
