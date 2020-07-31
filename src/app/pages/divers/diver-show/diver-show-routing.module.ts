import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiverShowPage } from './diver-show.page';

const routes: Routes = [
  {
    path: '',
    component: DiverShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiverShowPageRoutingModule {}
