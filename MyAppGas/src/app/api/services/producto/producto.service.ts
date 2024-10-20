import { Injectable } from '@angular/core';
import { producto } from 'src/app/models/producto';
import { ApiConfigService } from '../api-config/api-config.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';
<<<<<<< HEAD
import { CrearProducto } from 'src/app/models/CrearProducto';


=======
import { CrearProducto } from 'src/app/models/crearProducto';
>>>>>>> 482c7b5bb07bf1fa034f87281cde0fdb21406caf

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  path = 'Producto';

<<<<<<< HEAD
  path = "producto"

  constructor(private apiService: ApiConfigService) { }

  obtener_productos(): Observable<HttpResponse<producto[]>> {
    const params = new HttpParams().set('select',"*");
    return this.apiService.get<producto[]>(this.path, params).pipe(
      map(response =>{
        console.log(response)
        const filteredBody = response.body?.filter(product => product.deleted_at === null);
=======
  constructor(private apiService: ApiConfigService) {}

  obtener_productos(): Observable<HttpResponse<producto[]>> {
    const params = new HttpParams().set('select', '*');
    return this.apiService.get<producto[]>(this.path, params).pipe(
      map((response) => {
        console.log(response);
        const filteredBody = response.body?.filter(
          (product) => product.deleted_at === null
        );
>>>>>>> 482c7b5bb07bf1fa034f87281cde0fdb21406caf

        return new HttpResponse({
          body: filteredBody,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        });
      })
<<<<<<< HEAD
    )
  }

  agregarNuevoProducto(producto: CrearProducto): Observable<HttpResponse<producto>>{
=======
    );
  }

  agregarNuevoProducto(
    producto: CrearProducto
  ): Observable<HttpResponse<producto>> {
>>>>>>> 482c7b5bb07bf1fa034f87281cde0fdb21406caf
    return this.apiService.post(this.path, producto);
  }
}
