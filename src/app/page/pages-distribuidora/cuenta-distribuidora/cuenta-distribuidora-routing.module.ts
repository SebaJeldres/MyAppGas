import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentaDistribuidoraPage } from './cuenta-distribuidora.page';

const routes: Routes = [
  {
    path: '',
    component: CuentaDistribuidoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentaDistribuidoraPageRoutingModule {}
