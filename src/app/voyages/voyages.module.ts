import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoyagesPageRoutingModule } from './voyages-routing.module';

import { VoyagesPage } from './voyages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoyagesPageRoutingModule
  ],
  declarations: [VoyagesPage]
})
export class VoyagesPageModule {}
