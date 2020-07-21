import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiverEditPage } from './diver-edit.page';

const routes: Routes = [
  {
    path: '',
    component: DiverEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiverEditPageRoutingModule {}
