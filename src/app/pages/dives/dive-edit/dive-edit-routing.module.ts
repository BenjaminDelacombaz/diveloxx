import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiveEditPage } from './dive-edit.page';

const routes: Routes = [
  {
    path: '',
    component: DiveEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiveEditPageRoutingModule {}
