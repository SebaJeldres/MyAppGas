import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistorialVentasDistribuidoraPage } from './historial-ventas.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialVentasDistribuidoraPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialVentasPageRoutingModule {}

