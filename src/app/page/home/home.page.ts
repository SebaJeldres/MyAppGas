import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from 'src/app/api/services/solicitud/solicitud.service';
import { PedidoService } from 'src/app/api/services/pedido/pedido.service'; // Asegúrate de importar el servicio de pedidos
import { solicitud } from 'src/app/models/solicitud';
import { Pedido } from 'src/app/models/pedido';
import { BuscarUsuarioService } from 'src/app/api/services/buscar_usuario/buscar-usuario.service'; // Importa el servicio para obtener datos del usuario

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  solicitudesEnEspera: solicitud[] = []
  pedidosEnCamino: Pedido[] = []
  pedidosEnEspera: Pedido[] = [];
    
  // Inicializamos las variables de usuario
  id: string | null = null;
  username: string | null = null;
  rol: string | null = null;
  Nombre: string | null = null;
  apellido: string | null = null;
  Correo: string | null = null;
  NumTelefonico: string | null = null;
  Direccion: string | null = null;

  constructor(
    private router: Router,
    private SolicitudService: SolicitudService,
    private PedidoService: PedidoService,  // Inyectar el servicio de pedidos
    private buscarUsuarioService: BuscarUsuarioService // Inyectar el servicio de usuario
  ) {}

  ngOnInit() {
    // Obtener el usuario actual desde el servicio 'BuscarUsuarioService'
    const usuario = this.buscarUsuarioService.getUser();
    
    if (usuario) {
      this.id = usuario.id;
      this.username = usuario.username;
      this.rol = usuario.rol || 'No definido';
      this.Nombre = usuario.nombre || '';
      this.apellido = usuario.apellido || '';
      this.Correo = usuario.correo || '';
      this.NumTelefonico = usuario.numTelefonico || '';
      this.Direccion = usuario.direccion || '';
    }

    // Obtener las solicitudes y pedidos
    this.obtenerSolicitudesEnEspera();
    this.obtenerPedidosEnEspera();
    this.obtenerPedidosEnCamino();
  }

  // Obtener las solicitudes del servicio filtrados por estado: espera (Get para rol usuario y distribuidora)
  obtenerSolicitudesEnEspera() {
    this.SolicitudService.obtener_solicitud().subscribe((response: any) => {
      this.solicitudesEnEspera = response.body.filter(
        (solicitud: solicitud) => solicitud.estado_soli === 'espera'
      );
    });
  }

  // Obtener los pedidos filtrados por estado: espera (Get para repartidor)
  obtenerPedidosEnEspera() {
    this.PedidoService.obtener_pedido().subscribe((response: any) => {
      this.pedidosEnEspera = response.body
        .filter((pedido: Pedido) => pedido.estado === 'Espera')
        .map((pedido: Pedido) => ({
          ...pedido,
        }));
    });
  }

  // Obtener los pedidos filtrados por estado: En Camino (Get para todos los roles)
  obtenerPedidosEnCamino() {
    this.PedidoService.obtener_pedido().subscribe((response: any) => {
      this.pedidosEnCamino = response.body
        .filter((pedido: Pedido) => pedido.estado === 'Camino')
        .map((pedido: Pedido) => ({
          ...pedido,
        }));
      console.log('Pedidos filtrados (En Camino):', this.pedidosEnCamino);
    });
  }

  // Método para navegar a la página de perfil de usuario
  irAPerfilUser() {
    this.router.navigate(['cuenta-usuario'], {
      state: {
        id: this.id,
        username: this.username,
        rol: this.rol,
        nombre: this.Nombre,
        apellido: this.apellido,
        correo: this.Correo,
        numTelefonico: this.NumTelefonico,
        Direccion: this.Direccion
      }
    });
  }

  irAPerfilRepartidor() {
    this.router.navigate(['cuenta-repartidor'], {
      state: {
        id: this.id,
        username: this.username,
        rol: this.rol,
        nombre: this.Nombre,
        apellido: this.apellido,
        correo: this.Correo,
        numTelefonico: this.NumTelefonico,
        Direccion: this.Direccion
      }
    });
  }

  irAPerfilDistribuidora() {
    this.router.navigate(['cuenta-distribuidora'], {
      state: {
        id: this.id,
        username: this.username,
        rol: this.rol,
        nombre: this.Nombre,
        apellido: this.apellido,
        correo: this.Correo,
        numTelefonico: this.NumTelefonico,
        Direccion: this.Direccion
      }
    });
  }

  irAHistorialPedidos() {
    this.router.navigate(['historial-pedidos'], {
      state: {
        id: this.id
      }
    });
  }

  irARealizarPedidos() {
    this.router.navigate(['realizar-pedido'], {
      state: {
        id: this.id
      }
    });
  }

  irADetalleSolicitud(solicitud: any) {
    this.router.navigate(['detalle-soli'], {
      state: { solicitud, id: this.id, rol: this.rol }, // Enviamos toda la información de la solicitud
    });
  }

  // Id a Repartidor
  irADetallePedido(pedido: any) {
    this.router.navigate(['detalle-pedido'], {
      state: { pedido, id: this.id, rol: this.rol, nombre_user: this.username }, // Enviamos toda la información del pedido
    });
  }

  irABoleta(pedido: any) {
    this.router.navigate(['boleta'], {
      state: { pedido, id: this.id, rol: this.rol }, // Enviamos toda la información de la boleta
    });
  }

  irAInformacionVehiculo() {
    this.router.navigate(['informacion-vehiculo'], {
      state: {
        id: this.id
      }
    });
  }

  irAHistorialEntregas() {
    this.router.navigate(['historial-entregas'], {
      state: {
        id: this.id
      }
    });
  }

  // Id Distribuidora
  irAGestionarProductos() {
    this.router.navigate(['gestionar-productos'], {
      state: {
        id: this.id
      }
    });
  }

  irAHistorialVentas() {
    this.router.navigate(['historial-ventas'], {
      state: {
        id: this.id
      }
    });
  }
}
