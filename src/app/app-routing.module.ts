import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then(m => m.HomePageModule),
    //canActivate: [authGuard]
    
  },
  {
    path: 'historial-pedidos',
    loadChildren: () => import('./page/pages-usuario/historial-pedidos/historial-pedidos.module').then(m => m.HistorialPedidosPageModule)
  },
  {
    path: 'cuenta-usuario',
    loadChildren: () => import('./page/pages-usuario/cuenta-usuario/cuenta-usuario.module').then(m => m.CuentaUsuarioPageModule)
  },
  {
    path: 'realizar-pedido',
    loadChildren: () => import('./page/pages-usuario/realizar-pedido/realizar-pedido.module').then(m => m.RealizarPedidoPageModule)
  },
  {
    path: 'cuenta-repartidor',
    loadChildren: () => import('./page/pages-repartidor/cuenta-repartidor/cuenta-repartidor.module').then(m => m.CuentaRepartidorPageModule)
  },
  {
    path: 'informacion-vehiculo',
    loadChildren: () => import('./page/pages-repartidor/informacion-vehiculo/informacion-vehiculo.module').then(m => m.InformacionVehiculoPageModule)
  },
  {
    path: 'historial-entregas',
    loadChildren: () => import('./page/pages-repartidor/historial-entregas/historial-entregas.module').then(m => m.HistorialEntregasPageModule)
  },
  {
    path: 'gestionar-productos',
    loadChildren: () => import('./page/pages-distribuidora/gestionar-productos/gestionar-productos.module').then(m => m.GestionarProductosPageModule)
  },
  {
    path: 'historial-ventas',
    loadChildren: () => import('./page/pages-distribuidora/historial-ventas/historial-ventas.module').then(m => m.HistorialVentasPageModule)
  },
  {
    path: 'cuenta-distribuidora',
    loadChildren: () => import('./page/pages-distribuidora/cuenta-distribuidora/cuenta-distribuidora.module').then(m => m.CuentaDistribuidoraPageModule)
  },
  {
    path: 'detalle-soli',
    loadChildren: () => import('./page/pages-distribuidora/detalle-soli/detalle-soli.module').then( m => m.DetalleSoliPageModule)
  },  {
    path: 'detalle-pedido',
    loadChildren: () => import('./page/pages-repartidor/detalle-pedido/detalle-pedido.module').then( m => m.DetallePedidoPageModule)
  },
  {
    path: 'boleta',
    loadChildren: () => import('./page/boleta/boleta.module').then( m => m.BoletaPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

