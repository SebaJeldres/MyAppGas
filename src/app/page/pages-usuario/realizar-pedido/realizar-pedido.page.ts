import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductoService } from 'src/app/api/services/producto/producto.service';
import { SolicitudService } from 'src/app/api/services/solicitud/solicitud.service';
import { UserService } from 'src/app/api/services/user/user.service';
import { producto } from 'src/app/models/producto';
import { solicitud } from 'src/app/models/solicitud';

@Component({
  selector: 'app-realizar-pedido',
  templateUrl: './realizar-pedido.page.html',
  styleUrls: ['./realizar-pedido.page.scss'],
})
export class RealizarPedidoPage implements OnInit {
  productos: producto[] = [];
  solicitud: solicitud = {
    nombre_usuario: '',
    direccion: '',
    numtelefonico: '',
    detalle_pedido: [],
    metodo_pago: '',
    hora_ini: new Date(),
    estado_soli: 'espera',
    monto_total: 0,
    longitude: 0,
    latitude: 0,
  };
  total: number = 0;
  private map!: google.maps.Map;
  private marker!: google.maps.Marker;

  constructor(
    private solicitudService: SolicitudService,
    private productoService: ProductoService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.productoService.obtener_productos().subscribe(
      (response: any) => {
        this.productos = response.body.map((producto: producto) => ({
          ...producto,
          cantidad: 0,
        }));
        console.log(this.productos);
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener los productos:', error);
        alert('Hubo un error al obtener los productos.');
      }
    );

    this.userService.getUserById('3').subscribe((user) => {
      if (user) {
        this.solicitud.nombre_usuario = user.nombre || 'Usuario';
        this.solicitud.direccion = user.direccion || 'Dirección no disponible';
        this.solicitud.numtelefonico = user.num_telefonico || 'Teléfono no disponible';
      } else {
        console.error('Usuario no encontrado');
        alert('No se ha encontrado al usuario con ID 3.');
      }
    });

    this.initMap();
  }

  initMap() {
    const initialLocation = { lat: -32.999928, lng: -71.509687 };
    const mapOptions: google.maps.MapOptions = {
      center: initialLocation,
      zoom: 15,
    };

    const mapElement = document.getElementById('map') as HTMLElement;
    this.map = new google.maps.Map(mapElement, mapOptions);

    // Marcador inicial
    this.marker = new google.maps.Marker({
      position: initialLocation,
      map: this.map,
      draggable: true,
      title: 'Selecciona tu ubicación',
    });

    // Actualizar coordenadas al mover el marcador
    this.marker.addListener('dragend', () => {
      const position = this.marker.getPosition();
      if (position) {
        this.solicitud.latitude = position.lat();
        this.solicitud.longitude = position.lng();
      }
    });

    // Permitir clics en el mapa para mover el marcador
    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const clickedLocation = event.latLng;
        this.marker.setPosition(clickedLocation);

        this.solicitud.latitude = clickedLocation.lat();
        this.solicitud.longitude = clickedLocation.lng();
      }
    });
  }

  confirmarUbicacion() {
    alert(
      `Ubicación seleccionada: \nLatitud: ${this.solicitud.latitude}, Longitud: ${this.solicitud.longitude}`
    );
  }

  calcularTotal() {
    this.total = this.productos.reduce((sum, producto) => {
      return sum + producto.precio * (producto.cantidad || 0);
    }, 0);
    this.solicitud.monto_total = this.total;
  }

  // Método para modificar la cantidad de los productos
  modificarCantidad(producto: any, tipo: string) {
    if (!producto.cantidad) {
      producto.cantidad = 0;
    }

    // Aumentar o disminuir la cantidad
    if (tipo === 'mas') {
      producto.cantidad++;
    } else if (tipo === 'menos' && producto.cantidad > 0) {
      producto.cantidad--;
    }

    // Recalcular el total después de modificar la cantidad
    this.calcularTotal();
  }

  realizarPedido() {
    const productosSeleccionados = this.productos
      .filter((producto) => producto.cantidad && producto.cantidad > 0)
      .map((producto) => `${producto.id} ${producto.nombre} (${producto.cantidad})`);

    if (productosSeleccionados.length === 0) {
      alert('Por favor, selecciona al menos un producto.');
      return;
    }

    if (!this.solicitud.metodo_pago) {
      alert('Por favor, selecciona un método de pago.');
      return;
    }

    this.solicitud.detalle_pedido = productosSeleccionados;

    this.solicitudService.crearSolicitud(this.solicitud).subscribe(
      (response: any) => {
        alert(`Pedido realizado por un total de $${this.total}`);
      },
      (error: HttpErrorResponse) => {
        console.error('Error al realizar el pedido:', error);
        alert('Hubo un error al realizar el pedido.');
      }
    );
  }
}
