import { Injectable } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { ApiConfigService } from '../api-config/api-config.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  path = 'pedido';

  constructor(private apiService: ApiConfigService) { }

  obtener_pedido(): Observable<HttpResponse<Pedido[]>> {
    const params = new HttpParams().set('select', '*');
    return this.apiService.get<Pedido[]>(this.path, params).pipe(
      map((response) => {
        console.log(response);
        const filteredBody = response.body?.filter(
          (product) => product.estado === null
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
}
