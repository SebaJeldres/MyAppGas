import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentaUsuarioPage } from './cuenta-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: CuentaUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentaUsuarioPageRoutingModule {}
