import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/api/services/producto/producto.service'; // Servicio para obtener productos
import { SolicitudService } from 'src/app/api/services/solicitud/solicitud.service'; // Servicio para manejar pedidos
import { producto } from 'src/app/models/producto'; // Modelo Producto
import { Pedido } from 'src/app/models/pedido'; // Modelo Pedido

@Component({
  selector: 'app-realizar-pedido',
  templateUrl: './realizar-pedido.page.html',
  styleUrls: ['./realizar-pedido.page.scss'],
})
export class RealizarPedidoPage implements OnInit {
  productos: producto[] = [];
  pedido: Pedido = {
    id: '',
    nombre_usuario: 'Nombre del usuario',
    nombre_repartidor: '',
    distribuidora: 'Distribuidora predeterminada',
    patente: '',
    monto_total: 0,
    detalle_pedido: [],
    metodo_pago: '',
    direccion: 'Dirección del usuario',
    num_telefonico: 'Número telefónico',
    estado: 'Disponible',
  };
  total: number = 0;

  constructor(
    private solicitudService: SolicitudService,
    private productoService: ProductoService
  ) {}

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
    this.pedido.monto_total = this.total;
  }

  realizarPedido() {
    const productosSeleccionados = this.productos
      .filter((producto) => producto.cantidad && producto.cantidad > 0)
      .map((producto) => `${producto.nombre} (${producto.cantidad})`);

    if (productosSeleccionados.length === 0) {
      alert('Por favor, selecciona al menos un producto.');
      return;
    }

    this.pedido.detalle_pedido = productosSeleccionados;

    this.solicitudService.crearPedido(this.pedido).subscribe(
      (response: any) => {
        alert(`Pedido realizado por un total de $${this.total}`);
      },
      (error: any) => {
        alert('Hubo un error al realizar el pedido.');
        console.error('Error al realizar el pedido:', error);
      }
    );
  }
}
