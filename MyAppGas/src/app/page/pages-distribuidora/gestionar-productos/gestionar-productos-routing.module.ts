import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionarProductosPage } from './gestionar-productos.page';

const routes: Routes = [
  {
    path: '',
    component: GestionarProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionarProductosPageRoutingModule {}
