import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentaUsuarioPageRoutingModule } from './cuenta-usuario-routing.module';

import { CuentaUsuarioPage } from './cuenta-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentaUsuarioPageRoutingModule
  ],
  declarations: [CuentaUsuarioPage]
})
export class CuentaUsuarioPageModule {}
