import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/api/services/producto/producto.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { Compania } from 'src/app/models/compania';
import { CompaniasService } from 'src/app/api/services/companias/companias.service';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CrearProducto } from 'src/app/models/crearProducto';

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
    compania: null, // Cambiado a null para que coincida con el tipo
    tipo: "",
    kilos: null,
    precio: null,
    stock: null
  };

  companias: Compania[] = [];

  constructor(private _serviceProducto: ProductoService, private _serviceCompania: CompaniasService) {}

  async ngOnInit() {
    try {
      await this.obtenerProductos(); // Agregado await aquí para asegurar que se obtienen los productos
      this.companias = await firstValueFrom(this._serviceCompania.obtener_companias()); // Asegúrate de que esto devuelva un Observable
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.error("Error en Autenticación:", error.status);
      }
    }
  }

  cancelar() {
    this.modal.dismiss(null, 'cancel');
  }

  async obtenerProductos() {
    const response: HttpResponse<producto[]> = await firstValueFrom(this._serviceProducto.obtener_productos());
    console.log(response);
    this.productos = response.body || [];
  }

  async agregarProducto(nuevo_producto: CrearProducto) {
    console.log(nuevo_producto);
    const response: HttpResponse<producto> = await firstValueFrom(this._serviceProducto.agregarNuevoProducto(nuevo_producto));
    this.obtenerProductos(); // Puede que quieras esperar a que se complete antes de actualizar
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.mensaje = `Hello, ${ev.detail.data}!`;
    }
  }
}
