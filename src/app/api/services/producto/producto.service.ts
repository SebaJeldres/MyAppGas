// producto.service.ts
import { Injectable } from '@angular/core';
import { producto } from 'src/app/models/producto';
import { ApiConfigService } from '../api-config/api-config.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CrearProducto } from 'src/app/models/crearProducto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  path = 'producto';

  constructor(private apiService: ApiConfigService) {}

  obtener_productos(): Observable<HttpResponse<producto[]>> {
    const params = new HttpParams().set('select', '*');
    return this.apiService.get<producto[]>(this.path, params).pipe(
      map((response) => {
        return new HttpResponse({
          body: response.body,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        });
      })
    );
  }

  agregarNuevoProducto(producto: CrearProducto): Observable<HttpResponse<producto>> {
    return this.apiService.post(this.path, producto);
  }

  // Nueva función para actualizar productos
  actualizarProducto(id: string, producto: CrearProducto): Observable<HttpResponse<producto>> {
    return this.apiService.patch(`producto?id=eq.${id}`, producto);
  }

  eliminarProducto(id: string): Observable<HttpResponse<void>> {
    return this.apiService.delete<void>(`producto?id=eq.${id}`);
  }
}
