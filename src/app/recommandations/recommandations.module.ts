import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommandationsPageRoutingModule } from './recommandations-routing.module';

import { RecommandationsPage } from './recommandations.page';
import { ModalPage } from '../modal/modal.page'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommandationsPageRoutingModule
  ],
  declarations: [RecommandationsPage, ModalPage],
  entryComponents: [ModalPage]
})
export class RecommandationsPageModule {}
