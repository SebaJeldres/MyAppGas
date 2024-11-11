import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentaRepartidorPage } from './cuenta-repartidor.page';

const routes: Routes = [
  {
    path: '',
    component: CuentaRepartidorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentaRepartidorPageRoutingModule {}
