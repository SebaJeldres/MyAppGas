import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoletaPageRoutingModule } from './boleta-routing.module';

import { BoletaPage } from './boleta.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoletaPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [BoletaPage]
})
export class BoletaPageModule {}
