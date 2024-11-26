import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from 'src/app/api/services/solicitud/solicitud.service';
import { PedidoService } from 'src/app/api/services/pedido/pedido.service'; // Asegúrate de importar el servicio de pedidos
import { solicitud } from 'src/app/models/solicitud';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  solicitudes: solicitud[] = [];
  solicitudesCanceladas: solicitud[] = [];
  pedidosFiltrados: Pedido[] = [];
  pedidosEnCamino: Pedido[] = [];  
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
    private PedidoService: PedidoService  // Inyectar el servicio de pedidos
  ) {}

  ngOnInit() {
    // Recuperar el estado de la navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.id = navigation.extras.state['id'];
      this.username = navigation.extras.state['x'];
      this.rol = navigation.extras.state['rol'] || 'No definido';
      this.Nombre = navigation.extras.state['nombre'] || '';
      this.apellido = navigation.extras.state['apellido'] || '';
      this.Correo = navigation.extras.state['correo'] || '';
      this.NumTelefonico = navigation.extras.state['numTelefonico'] || '';
      this.Direccion = navigation.extras.state['Direccion'] || '';
    }

    // Obtener las solicitudes del servicio
    this.SolicitudService.obtener_solicitud().subscribe((response: any) => {
      this.solicitudes = response.body
        .filter((solicitud: solicitud) => solicitud.estado_soli === 'espera')
        .map((solicitud: solicitud) => ({
          ...solicitud,
        }));

      // Filtrar las solicitudes canceladas
      this.solicitudesCanceladas = response.body
        .filter((solicitud: solicitud) => solicitud.estado_soli === 'Cancelado' && solicitud.nombre_usuario === 'Dario_user')
        .map((solicitud: solicitud) => ({
          ...solicitud,
        }));
    });

    // Obtener los pedidos filtrados
    this.PedidoService.obtener_pedidosFiltrados().subscribe((response: any) => {
      this.pedidosFiltrados = response.body
        .map((pedido: Pedido) => ({
          ...pedido,
        }));
    });

    this.PedidoService.obtener_pedidosFiltrados2().subscribe((response: any) => {
      this.pedidosEnCamino = response.body
        .map((pedido: Pedido) => ({
          ...pedido,
        }));
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
      state: { solicitud }, // Enviamos toda la información de la solicitud
    });
  }

  // Id a Repartidor
  irADetallePedido(pedido: any) {
    this.router.navigate(['detalle-pedido'], {
      state: { pedido }, // Enviamos toda la información de la solicitud
    });
  }

  irABoleta(pedido: any) {
    this.router.navigate(['boleta'], {
      state: { pedido }, // Enviamos toda la información de la solicitud
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
