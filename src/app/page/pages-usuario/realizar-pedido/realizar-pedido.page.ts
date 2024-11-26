import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ProductoService } from 'src/app/api/services/producto/producto.service'; // Servicio para obtener productos
import { SolicitudService } from 'src/app/api/services/solicitud/solicitud.service'; // Servicio para manejar pedidos
import { crearSolicitud } from 'src/app/models/crearSolicitud';
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
    nombre_usuario: 'Dario_user',
    direccion: 'Los alelies 555',
    numtelefonico: '9 98529705',
    detalle_pedido: [],
    metodo_pago: 0,
    hora_ini: new Date(),
    estado_soli: 'espera',
    monto_total: 0
  };
  total: number = 0;

  constructor(
    private solicitudService: SolicitudService,
    private productoService: ProductoService
  ) { }

  ngOnInit() {
    this.productoService.obtener_productos().subscribe((response: any) => {
      this.productos = response.body.map((producto: producto) => ({
        ...producto,
        cantidad: 0,
      }));
      console.log(this.productos);
    });
  }

  calcularTotal() {
    this.total = this.productos.reduce((sum, producto) => {
      return sum + producto.precio * (producto.cantidad || 0);
    }, 0);
    this.solicitud.monto_total = this.total;
  }

  realizarPedido() {
    const productosSeleccionados = this.productos
      .filter((producto) => producto.cantidad && producto.cantidad > 0)
      .map((producto) => `${producto.id} ${producto.nombre} (${producto.cantidad})`);

    if (productosSeleccionados.length === 0) {
      alert('Por favor, selecciona al menos un producto.');
      return;
    }

    this.solicitud.detalle_pedido = productosSeleccionados;

    this.solicitudService.crearSolicitud(this.solicitud).subscribe(
      (response: any) => {
        alert(`Pedido realizado por un total de $${this.total}`);
      },
      (error: HttpErrorResponse) => {
        alert('Hubo un error al realizar el pedido.');
        console.error('Error al realizar el pedido:', error);
      }
    );
  }

  async agregarSolicitud(nuevaSolicitud: crearSolicitud) {
    try {
      console.log(nuevaSolicitud)
      const response: HttpResponse<solicitud> = await firstValueFrom(this.solicitudService.agregarSolicitud(nuevaSolicitud));
      console.log(response)
    } catch (error) {
      console.error(error)
    }

  }

}
