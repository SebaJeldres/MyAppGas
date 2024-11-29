import { Component, OnInit } from '@angular/core';
import { SolicitudService } from 'src/app/api/services/solicitud/solicitud.service';
import { solicitud } from 'src/app/models/solicitud';
import { PedidoService } from 'src/app/api/services/pedido/pedido.service';
import { Pedido } from 'src/app/models/pedido';
import { BuscarUsuarioService } from 'src/app/api/services/buscar_usuario/buscar-usuario.service';  // Para obtener el nombre del usuario

@Component({
  selector: 'app-historial-pedidos',
  templateUrl: './historial-pedidos.page.html',
  styleUrls: ['./historial-pedidos.page.scss'],
})
export class HistorialPedidosPage implements OnInit {

  pedidosEntregados: Pedido[] = [];
  pedidosCancelados: Pedido[] = [];
  solicitudesRechazadas: solicitud[] = [];
  
  nombreUsuario: string | null = null;  // Almacenar el nombre del usuario

  constructor(
    private SolicitudService: SolicitudService, 
    private PedidoService: PedidoService,
    private buscarUsuarioService: BuscarUsuarioService  // Inyectar servicio para obtener el nombre del usuario
  ) {}

  ngOnInit() {
    // Obtener el nombre del usuario (se supone que se guarda en el servicio)
    const usuario = this.buscarUsuarioService.getUser();
    if (usuario) {
      this.nombreUsuario = usuario.username;  // Asignar el nombre de usuario
    }

    this.obtenerPedidosEntregados();
    this.obtenerPedidosCancelados();
    this.obtenerSolicitudesRechazadas();
  }

  obtenerPedidosEntregados() {
    this.PedidoService.obtener_pedido().subscribe((response: any) => {
      // Filtra por estado y nombre_usuario
      this.pedidosEntregados = response.body.filter((pedido: Pedido) => 
        pedido.estado === 'Entregado' && pedido.nombre_usuario === this.nombreUsuario
      );
    });
  }

  obtenerPedidosCancelados() {
    this.PedidoService.obtener_pedido().subscribe((response: any) => {
      // Filtra por estado y nombre_usuario
      this.pedidosCancelados = response.body.filter((pedido: Pedido) => 
        pedido.estado === 'Cancelado' && pedido.nombre_usuario === this.nombreUsuario
      );
    });
  }

  obtenerSolicitudesRechazadas() {
    this.SolicitudService.obtener_solicitud().subscribe((response: any) => {
      // Filtra por estado y nombre_usuario
      this.solicitudesRechazadas = response.body.filter((solicitud: solicitud) => 
        solicitud.estado_soli === 'Cancelado' && solicitud.nombre_usuario === this.nombreUsuario
      );
    });
  }
}
