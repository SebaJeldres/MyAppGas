import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/api/services/pedido/pedido.service';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-historial-ventas-distribuidora',
  templateUrl: './historial-ventas.page.html',
  styleUrls: ['./historial-ventas.page.scss'],
})
export class HistorialVentasDistribuidoraPage implements OnInit {
  pedidosEntregados: Pedido[] = [];
  pedidosCancelados: Pedido[] = [];

  constructor( 
    private PedidoService: PedidoService
  ) { }

  ngOnInit() {

    this.obtenerPedidosEntregados();
    this.obtenerPedidosCancelados();
  }

  obtenerPedidosEntregados() {
    this.PedidoService.obtener_pedido().subscribe((response: any) => {
      this.pedidosEntregados = response.body.filter(
        (pedido: Pedido) => pedido.estado === 'Entregado'
      );
    });
  }
  obtenerPedidosCancelados() {
    this.PedidoService.obtener_pedido().subscribe((response: any) => {
      this.pedidosCancelados = response.body.filter(
        (pedido: Pedido) => pedido.estado === 'Cancelado'
      );
    });
  }
}
