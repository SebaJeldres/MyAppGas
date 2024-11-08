import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../api-config/api-config.service'; // Servicio para manejar las API requests
import { solicitud } from 'src/app/models/solicitud'; // Modelo de Pedido
import { crearSolicitud } from 'src/app/models/crearSolicitud';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  path = 'solicitud'; // La ruta base para manejar pedidos

  constructor(private apiService: ApiConfigService) { }

  crearSolicitud(solicitud: solicitud): Observable<HttpResponse<solicitud>> | any{
    try {
      console.info(solicitud)
      return this.apiService.post<solicitud>(this.path, solicitud);
    } catch (error) {
      console.error(error)
    }
  }

  agregarSolicitud(
    solicitud: crearSolicitud
  ): Observable<HttpResponse<solicitud>> {
    return this.apiService.post(this.path, solicitud);
  }
}
