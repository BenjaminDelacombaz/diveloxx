import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiveSiteIndexPage } from './dive-site-index.page';

const routes: Routes = [
  {
    path: '',
    component: DiveSiteIndexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiveSiteIndexPageRoutingModule {}
