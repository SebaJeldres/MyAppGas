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

  solicitudesCanceladas: solicitud[] = [];
  pedidosEntregados: Pedido[] = [];

  constructor(
    private SolicitudService: SolicitudService, 
    private PedidoService: PedidoService
  ) {}

  ngOnInit() {
    // Obtener las solicitudes canceladas
    this.SolicitudService.obtener_solicitud().subscribe((response: any) => {
      // Filtrar solicitudes con estado 'Cancelado'
      this.solicitudesCanceladas = response.body.filter((solicitud: solicitud) => solicitud.estado_soli === 'Cancelado');
    });

    // Obtener los pedidos entregados
    this.PedidoService.obtener_pedido().subscribe((response: any) => {
      // Filtrar pedidos con estado 'Entregado'
      this.pedidosEntregados = response.body.filter((pedido: Pedido) => pedido.estado === 'Entregado');
    });
  }
}
