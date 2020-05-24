import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepensesRevenuPageRoutingModule } from './depenses-revenu-routing.module';

import { DepensesRevenuPage } from './depenses-revenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepensesRevenuPageRoutingModule
  ],
  declarations: [DepensesRevenuPage]
})
export class DepensesRevenuPageModule {}
