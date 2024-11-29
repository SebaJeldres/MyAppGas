import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductoService } from 'src/app/api/services/producto/producto.service'; // Servicio para obtener productos
import { SolicitudService } from 'src/app/api/services/solicitud/solicitud.service'; // Servicio para manejar pedidos
import { UserService } from 'src/app/api/services/user/user.service'; // Servicio para obtener datos del usuario logueado
import { producto } from 'src/app/models/producto'; // Modelo Producto
import { solicitud } from 'src/app/models/solicitud'; // Modelo Pedido

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
    metodo_pago: '', // Asignamos un valor por defecto vacío
    hora_ini: new Date(),
    estado_soli: 'espera',
    monto_total: 0,
    longitude: 0,
    latitude:0
  };
  total: number = 0;

  constructor(
    private solicitudService: SolicitudService,
    private productoService: ProductoService,
    private userService: UserService // Inyectamos el servicio UserService
  ) { }

  ngOnInit() {
    // Obtener los productos disponibles
    this.productoService.obtener_productos().subscribe(
      (response: any) => {
        this.productos = response.body.map((producto: producto) => ({
          ...producto,
          cantidad: 0, // Inicializamos la cantidad de cada producto a 0
        }));
        console.log(this.productos);
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener los productos:', error);
        alert('Hubo un error al obtener los productos.');
      }
    );

    // Obtener los datos del usuario con ID 3
    this.userService.getUserById('3').subscribe((user) => {
      if (user) {
        // Asignamos los datos del usuario al modelo de la solicitud
        this.solicitud.nombre_usuario = user.nombre || 'Usuario';
        this.solicitud.direccion = user.direccion || 'Dirección no disponible';
        this.solicitud.numtelefonico = user.num_telefonico || 'Teléfono no disponible';
        this.solicitud.latitude= user.latitude ;
        this.solicitud.longitude= user.longitude;
      } else {
        console.error('Usuario no encontrado');
        alert('No se ha encontrado al usuario con ID 3.');
      }
    });
  }

  calcularTotal() {
    this.total = this.productos.reduce((sum, producto) => {
      return sum + producto.precio * (producto.cantidad || 0); // Calculamos el total basado en la cantidad seleccionada
    }, 0);
    this.solicitud.monto_total = this.total; // Actualizamos el monto total de la solicitud
  }

  realizarPedido() {
    const productosSeleccionados = this.productos
      .filter((producto) => producto.cantidad && producto.cantidad > 0) // Filtramos productos con cantidad > 0
      .map((producto) => `${producto.id} ${producto.nombre} (${producto.cantidad})`); // Creamos un listado de productos seleccionados

    if (productosSeleccionados.length === 0) {
      alert('Por favor, selecciona al menos un producto.');
      return;
    }

    if (!this.solicitud.metodo_pago) { // Verificamos que se haya seleccionado un método de pago
      alert('Por favor, selecciona un método de pago.');
      return;
    }

    this.solicitud.detalle_pedido = productosSeleccionados; // Asignamos los productos seleccionados al detalle del pedido

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
