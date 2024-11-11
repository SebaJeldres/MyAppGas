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
    compania: "",
    tipo: "",
    kilos: null,
    precio: null,
    stock: null
  };

  companias: Compania[] = [];

  constructor(private _serviceProducto: ProductoService, private _serviceCompania: CompaniasService) {}

  async ngOnInit() {
    try {
      await this.obtenerProductos();
      this.companias = this._serviceCompania.obtener_companias();

    } catch (error){
      if (error instanceof HttpErrorResponse) {
        console.error("Error en Authentificación: ", error.status)
      }
    }
  }
  

  cancelar() {
    this.modal.dismiss(null, 'cancel');
  }

  async obtenerProductos() {
    try {
      const response: HttpResponse<producto[]> = await firstValueFrom(this._serviceProducto.obtener_productos());
      console.log('Respuesta de supabase', response);
      if (response.body) {
        console.log('Productos obtenidos: ', response.body);
    } else {
      console.warn('No se encontraron productos en la respuesta');
    }
    this.productos = response.body || [];
  } catch (error) {
    console.log('Error al obtener productos: ', error);
  }
}

  async agregarProducto(nuevoProducto: CrearProducto) {
    console.log(nuevoProducto)
    const response: HttpResponse<producto> = await firstValueFrom(this._serviceProducto.agregarNuevoProducto(nuevoProducto));
    console.log(response)
    this.obtenerProductos();
    this.modal.dismiss(this.name, 'confirm')
  
  }
  
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.mensaje = `Hello, ${ev.detail.data}!`;
    }
  }
}

