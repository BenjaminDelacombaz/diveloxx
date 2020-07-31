import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiveSiteEditPage } from './dive-site-edit.page';

const routes: Routes = [
  {
    path: '',
    component: DiveSiteEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiveSiteEditPageRoutingModule {}
