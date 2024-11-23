import { Injectable } from '@angular/core';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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

  obtener_solicitud(): Observable<HttpResponse<solicitud[]>> {
    const params = new HttpParams().set('select', '*');
    return this.apiService.get<solicitud[]>(this.path, params).pipe(
      map((response) => {
        console.log(response);
        const filteredBody = response.body; 

        return new HttpResponse({
          body: filteredBody,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        });
      })
    );
  }

  actualizarEstadoSolicitud(id: number, estado: string): Observable<any> {
    const body = { estado_soli: estado };
    // Asegúrate de que la URL esté bien construida
    return this.apiService.patch(`solicitud?id=eq.${id}`, body);
  }
  
}

