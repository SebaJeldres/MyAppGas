import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentaDistribuidoraPageRoutingModule } from './cuenta-distribuidora-routing.module';

import { CuentaDistribuidoraPage } from './cuenta-distribuidora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentaDistribuidoraPageRoutingModule
  ],
  declarations: [CuentaDistribuidoraPage]
})
export class CuentaDistribuidoraPageModule {}
