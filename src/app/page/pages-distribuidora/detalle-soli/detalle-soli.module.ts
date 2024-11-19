import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleSoliPageRoutingModule } from './detalle-soli-routing.module';

import { DetalleSoliPage } from './detalle-soli.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DetalleSoliPageRoutingModule
  ],
  declarations: [DetalleSoliPage]
})
export class DetalleSoliPageModule {}
