import { Injectable } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { ApiConfigService } from '../api-config/api-config.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  path = 'pedido';

  constructor(private apiService: ApiConfigService) {}

  // Método para obtener todos los pedidos
  obtener_pedido(): Observable<HttpResponse<Pedido[]>> {
    const params = new HttpParams().set('select', '*');
    return this.apiService.get<Pedido[]>(this.path, params).pipe(
      map((response) => {
        const filteredBody = response.body?.filter(
          (pedido) => pedido.estado === null
        );
        return new HttpResponse({
          body: filteredBody,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        });
      }),
      catchError((error) => {
        console.error('Error al obtener los pedidos:', error);
        return throwError(() => new Error('Error al obtener los pedidos.'));
      })
    );
  }

  // Método para obtener pedidos filtrados por estado 'espera' y repartidor 'Jose'
  obtener_pedidosFiltrados(): Observable<HttpResponse<Pedido[]>> {
    const params = new HttpParams().set('select', '*');
    return this.apiService.get<Pedido[]>(this.path, params).pipe(
      map((response) => {
        // Filtramos por estado 'espera' y nombre_repartidor 'Jose'
        const filteredBody = response.body?.filter(
          (pedido) => pedido.estado === 'espera' 
        );
        return new HttpResponse({
          body: filteredBody,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        });
      }),
      catchError((error) => {
        console.error('Error al obtener los pedidos filtrados:', error);
        return throwError(() => new Error('Error al obtener los pedidos filtrados.'));
      })
    );
  }

  obtener_pedidosFiltrados2(): Observable<HttpResponse<Pedido[]>> {
    const params = new HttpParams().set('select', '*');
    return this.apiService.get<Pedido[]>(this.path, params).pipe(
      map((response) => {
        // Filtramos por estado 'espera' y nombre_repartidor 'Jose'
        const filteredBody = response.body?.filter(
          (pedido) => pedido.estado === 'En Camino' 
        );
        return new HttpResponse({
          body: filteredBody,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        });
      }),
      catchError((error) => {
        console.error('Error al obtener los pedidos filtrados:', error);
        return throwError(() => new Error('Error al obtener los pedidos filtrados.'));
      })
    );
  }

  // Método para crear un nuevo pedido
  crearPedido(pedido: Pedido): Observable<Pedido> {
    return this.apiService.post<Pedido>(this.path, pedido).pipe(
      map((response: HttpResponse<Pedido>) => response.body as Pedido),
      catchError((error) => {
        console.error('Error al crear el pedido:', error);
        return throwError(() => new Error('Error al crear el pedido.'));
      })
    );
  }
    // Método para actualizar un pedido existente
    // Método para actualizar un pedido existente
actualizarPedido(id: string, cambios: { patente: string; estado: string }): Observable<Pedido> {
  return this.apiService.patch<Pedido>(`pedido?id=eq.${id}`, cambios).pipe(
    map((response: HttpResponse<Pedido>) => response.body as Pedido),
    catchError((error) => {
      console.error('Error al actualizar el pedido:', error);
      return throwError(() => new Error('Error al actualizar el pedido.'));
    })
  );
}

actualizarPedido1(id: string, cambios: { estado: string }): Observable<Pedido> {
  return this.apiService.patch<Pedido>(`pedido?id=eq.${id}`, cambios).pipe(
    map((response: HttpResponse<Pedido>) => response.body as Pedido),
    catchError((error) => {
      console.error('Error al actualizar el pedido:', error);
      return throwError(() => new Error('Error al actualizar el pedido.'));
    })
  );
}
  
}
