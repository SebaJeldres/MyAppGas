import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionarProductosPageRoutingModule } from './gestionar-productos-routing.module';

import { GestionarProductosPage } from './gestionar-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionarProductosPageRoutingModule
  ],
  declarations: [GestionarProductosPage]
})
export class GestionarProductosPageModule {}
