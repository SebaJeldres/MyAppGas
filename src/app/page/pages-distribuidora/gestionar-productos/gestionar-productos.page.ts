import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/api/services/producto/producto.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CrearProducto } from 'src/app/models/crearProducto';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-gestionar-productos',
  templateUrl: './gestionar-productos.page.html',
  styleUrls: ['./gestionar-productos.page.scss'],
})
export class GestionarProductosPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  mensaje = "";
  name = "";
  productos: producto[] = [];
  alertButtons = ['Ok'];

  nuevo_producto: CrearProducto = {
    sku: "",
    nombre: "",
    tipo: "",
    kilos: null,
    precio: null,
    stock: null
  };

  modalTitulo: string = 'Nuevo Producto'; // Título para el modal

  constructor(private _serviceProducto: ProductoService) {}

  async ngOnInit() {
    try {
      await this.obtenerProductos();
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.error("Error en la autenticación: ", error.status);
      }
    }
  }

  cancelar() {
    this.modal.dismiss(null, 'cancel');
  }

  async obtenerProductos() {
    try {
      const response: HttpResponse<producto[]> = await firstValueFrom(this._serviceProducto.obtener_productos());
      if (response.body) {
        this.productos = response.body;
      }
    } catch (error) {
      console.log('Error al obtener productos: ', error);
    }
  }

  // Guardar el producto, ya sea nuevo o actualizado
  async guardarProducto() {
    if (this.nuevo_producto.sku) {
      if (this.nuevo_producto.id) {
        await this.modificarProducto(); // Modificar si tiene ID
      } else {
        await this.agregarProducto(); // Agregar si no tiene ID
      }
    }
  }

  // Agregar un nuevo producto
  async agregarProducto() {
    // No enviamos el 'id' ya que es autogenerado por Supabase
    const response: HttpResponse<producto> = await firstValueFrom(this._serviceProducto.agregarNuevoProducto(this.nuevo_producto));
    this.obtenerProductos();
    this.modal.dismiss(this.name, 'confirm');
  }

  // Modificar un producto existente
  async modificarProducto() {
    if (!this.nuevo_producto.id) return; // Si no tiene ID, no hacemos nada.
    const response: HttpResponse<producto> = await firstValueFrom(this._serviceProducto.actualizarProducto(this.nuevo_producto.id, this.nuevo_producto));
    this.obtenerProductos();
    this.modal.dismiss(this.name, 'confirm');
  }

  // Eliminar un producto
  async eliminarProducto(id: string) {
    if (!id) {
      console.error('El ID del producto es inválido');
      return;
    }
  
    try {
      await firstValueFrom(this._serviceProducto.eliminarProducto(id)); // Eliminar producto por ID
      this.obtenerProductos(); // Actualizar la lista de productos
    } catch (error) {
      console.error('Error al eliminar producto: ', error);
    }
  }
  

  // Abrir el modal para agregar un nuevo producto
  abrirModal() {
    this.modalTitulo = 'Nuevo Producto';
    this.nuevo_producto = {sku: "", nombre: "", tipo: "", kilos: null, precio: null, stock: null }; // Limpiar el formulario
    this.modal.present();
  }

  // Método para abrir el modal de modificación con los datos del producto
abrirModalModificar(producto: producto) {
  this.modalTitulo = 'Editar Producto'; // Cambia el título del modal
  this.nuevo_producto = { ...producto }; // Rellenamos el formulario con los datos del producto
  this.modal.present(); // Presentamos el modal
}


  // Al cerrar el modal
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.mensaje = `Hello, ${ev.detail.data}!`;
    }
  }
}
