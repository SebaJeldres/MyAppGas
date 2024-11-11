import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HistorialVentasPageRoutingModule } from './historial-ventas-routing.module';
import { HistorialVentasDistribuidoraPage } from './historial-ventas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialVentasPageRoutingModule,
  ],
  declarations: [HistorialVentasDistribuidoraPage]
})
export class HistorialVentasPageModule {}


