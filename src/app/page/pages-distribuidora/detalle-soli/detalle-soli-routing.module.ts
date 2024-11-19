import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleSoliPage } from './detalle-soli.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleSoliPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleSoliPageRoutingModule {}
