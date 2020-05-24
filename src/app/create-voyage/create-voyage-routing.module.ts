import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateVoyagePage } from './create-voyage.page';

const routes: Routes = [
  {
    path: '',
    component: CreateVoyagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateVoyagePageRoutingModule {}
