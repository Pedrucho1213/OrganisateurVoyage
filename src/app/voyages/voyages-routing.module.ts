import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoyagesPage } from './voyages.page';

const routes: Routes = [
  {
    path: '',
    component: VoyagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoyagesPageRoutingModule {}
