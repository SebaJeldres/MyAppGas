import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { DetallePedidoPageRoutingModule } from './detalle-pedido-routing.module';
import { DetallePedidoPage } from './detalle-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Aquí se importa
    IonicModule,
    DetallePedidoPageRoutingModule
  ],
  declarations: [DetallePedidoPage]
})
export class DetallePedidoPageModule {}
