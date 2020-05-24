import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepensesRevenuPage } from './depenses-revenu.page';

const routes: Routes = [
  {
    path: '',
    component: DepensesRevenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepensesRevenuPageRoutingModule {}
