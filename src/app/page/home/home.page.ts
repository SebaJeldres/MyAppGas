import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from 'src/app/api/services/solicitud/solicitud.service';
import { PedidoService } from 'src/app/api/services/pedido/pedido.service';
import { solicitud } from 'src/app/models/solicitud';
import { Pedido } from 'src/app/models/pedido';
import { BuscarUsuarioService } from 'src/app/api/services/buscar_usuario/buscar-usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  solicitudesEnEspera: solicitud[] = [];
  pedidosEnCamino: Pedido[] = [];
  pedidosEnEspera: Pedido[] = [];
    
  // Variables de usuario inicializadas
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
    private PedidoService: PedidoService,
    private buscarUsuarioService: BuscarUsuarioService
  ) {}

  ngOnInit() {
    // Recuperar los datos del usuario desde el servicio compartido o localStorage
    const usuario = this.buscarUsuarioService.getUser();
    
    if (usuario) {
      this.cargarDatosUsuario(usuario);
    } else {
      // Intentar recuperar desde almacenamiento local (para persistencia tras recargar)
      const usuarioStorage = localStorage.getItem('usuario');
      if (usuarioStorage) {
        const usuarioPersistido = JSON.parse(usuarioStorage);
        this.buscarUsuarioService.setUser(usuarioPersistido); // Actualizar el servicio compartido
        this.cargarDatosUsuario(usuarioPersistido);
      } else {
        // Si no hay usuario, redirigir al login
        this.router.navigate(['/login']);
        return;
      }
    }

    // Cargar solicitudes y pedidos
    this.obtenerSolicitudesEnEspera();
    this.obtenerPedidosEnEspera();
    this.obtenerPedidosEnCamino();
  }

  // Método para cargar los datos del usuario en variables locales
  cargarDatosUsuario(usuario: any) {
    this.id = usuario.id;
    this.username = usuario.username;
    this.rol = usuario.rol || 'No definido';
    this.Nombre = usuario.nombre || '';
    this.apellido = usuario.apellido || '';
    this.Correo = usuario.correo || '';
    this.NumTelefonico = usuario.num_telefonico || '';
    this.Direccion = usuario.direccion || '';
  }

  // Obtener solicitudes en espera
  obtenerSolicitudesEnEspera() {
    this.SolicitudService.obtener_solicitud().subscribe((response: any) => {
      this.solicitudesEnEspera = response.body.filter(
        (solicitud: solicitud) => solicitud.estado_soli === 'espera'
      );
    });
  }

  // Obtener pedidos en espera
  obtenerPedidosEnEspera() {
    this.PedidoService.obtener_pedido().subscribe((response: any) => {
      this.pedidosEnEspera = response.body
        .filter((pedido: Pedido) => pedido.estado === 'Espera')
        .map((pedido: Pedido) => ({ ...pedido }));
    });
  }

  // Obtener pedidos en camino
  obtenerPedidosEnCamino() {
    this.PedidoService.obtener_pedido().subscribe((response: any) => {
      this.pedidosEnCamino = response.body
        .filter((pedido: Pedido) => pedido.estado === 'Camino')
        .map((pedido: Pedido) => ({ ...pedido }));
      console.log('Pedidos filtrados (En Camino):', this.pedidosEnCamino);
    });
  }

  // Métodos de navegación
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
        Direccion: this.Direccion,
      },
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
        Direccion: this.Direccion,
      },
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
        Direccion: this.Direccion,
      },
    });
  }

  irAHistorialPedidos() {
    this.router.navigate(['historial-pedidos'], {
      state: { id: this.id },
    });
  }

  irARealizarPedidos() {
    this.router.navigate(['realizar-pedido'], {
      state: { id: this.id },
    });
  }

  irADetalleSolicitud(solicitud: any) {
    this.router.navigate(['detalle-soli'], {
      state: { solicitud, id: this.id, rol: this.rol },
    });
  }

  irADetallePedido(pedido: any) {
    this.router.navigate(['detalle-pedido'], {
      state: { pedido, id: this.id, rol: this.rol, nombre_user: this.username },
    });
  }

  irABoleta(pedido: any) {
    this.router.navigate(['boleta'], {
      state: { pedido, id: this.id, rol: this.rol },
    });
  }
  

  irAHistorialEntregas() {
    this.router.navigate(['historial-entregas'], {
      state: { id: this.id },
    });
  }

  irAGestionarProductos() {
    this.router.navigate(['gestionar-productos'], {
      state: { id: this.id },
    });
  }

  irAHistorialVentas() {
    this.router.navigate(['historial-ventas'], {
      state: { id: this.id },
    });
  }
}
