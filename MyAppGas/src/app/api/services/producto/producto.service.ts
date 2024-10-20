import { Injectable } from '@angular/core';
import { producto } from 'src/app/models/producto';
import { ApiConfigService } from '../api-config/api-config.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';
import { CrearProducto } from 'src/app/models/crearProducto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  path = 'Producto';

  constructor(private apiService: ApiConfigService) {}

  obtener_productos(): Observable<HttpResponse<producto[]>> {
    const params = new HttpParams().set('select', '*');
    return this.apiService.get<producto[]>(this.path, params).pipe(
      map((response) => {
        console.log(response);
        const filteredBody = response.body?.filter(
          (product) => product.deleted_at === null
        );

        return new HttpResponse({
          body: filteredBody,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        });
      })
    );
  }

  agregarNuevoProducto(
    producto: CrearProducto
  ): Observable<HttpResponse<producto>> {
    return this.apiService.post(this.path, producto);
  }
}
