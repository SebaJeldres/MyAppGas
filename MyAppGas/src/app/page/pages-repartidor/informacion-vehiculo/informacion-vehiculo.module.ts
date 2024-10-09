import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionVehiculoPageRoutingModule } from './informacion-vehiculo-routing.module';

import { InformacionVehiculoPage } from './informacion-vehiculo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformacionVehiculoPageRoutingModule
  ],
  declarations: [InformacionVehiculoPage]
})
export class InformacionVehiculoPageModule {}
