import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../api-config/api-config.service'; // Servicio para manejar las API requests
import { Pedido } from 'src/app/models/pedido'; // Modelo de Pedido

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  path = 'solicitud'; // La ruta base para manejar pedidos

  constructor(private apiService: ApiConfigService) {}

  // Método para crear un nuevo pedido
  crearPedido(pedido: Pedido): Observable<HttpResponse<Pedido>> {
    // Este método envía el pedido a la API utilizando una solicitud POST
    return this.apiService.post<Pedido>(this.path, pedido);
  }

  // Puedes agregar más métodos aquí para obtener pedidos o actualizarlos si es necesario
}
