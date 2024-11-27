import { Component, OnInit } from '@angular/core';
import { SolicitudService } from 'src/app/api/services/solicitud/solicitud.service';
import { solicitud } from 'src/app/models/solicitud';
import { PedidoService } from 'src/app/api/services/pedido/pedido.service';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-historial-pedidos',
  templateUrl: './historial-pedidos.page.html',
  styleUrls: ['./historial-pedidos.page.scss'],
})
export class HistorialPedidosPage implements OnInit {

  pedidosEntregados: Pedido[] = [];
  pedidosCancelados: Pedido[] = [];
  solicitudesRechazadas: solicitud[] = [];

  constructor(
    private SolicitudService: SolicitudService, 
    private PedidoService: PedidoService
  ) {}

  ngOnInit() {

    this.obtenerPedidosEntregados();
    this.obtenerPedidosCancelados();
    this.obtenerSolicitudesRechazadas();
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

  obtenerSolicitudesRechazadas() {
    this.SolicitudService.obtener_solicitud().subscribe((response: any) => {
      this.solicitudesRechazadas = response.body.filter(
        (solicitud: solicitud) => solicitud.estado_soli === 'Cancelado'
      );
    });
  }
}
