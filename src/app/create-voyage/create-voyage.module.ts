import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateVoyagePageRoutingModule } from './create-voyage-routing.module';

import { CreateVoyagePage } from './create-voyage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateVoyagePageRoutingModule
  ],
  declarations: [CreateVoyagePage]
})
export class CreateVoyagePageModule {}
