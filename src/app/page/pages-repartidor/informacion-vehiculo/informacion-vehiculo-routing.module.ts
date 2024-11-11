import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionVehiculoPage } from './informacion-vehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionVehiculoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionVehiculoPageRoutingModule {}
