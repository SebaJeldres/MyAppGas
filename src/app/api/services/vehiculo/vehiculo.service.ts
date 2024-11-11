import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config/api-config.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { crearVehiculo } from 'src/app/models/crearVehiculo';
import { vehiculo } from 'src/app/models/vehiculo';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  path = 'vehiculo';

  constructor(private apiService: ApiConfigService) {}

  obtener_vehiculos(): Observable<HttpResponse<vehiculo[]>> {
    const params = new HttpParams().set('select', '*');
    return this.apiService.get<vehiculo[]>(this.path, params).pipe(
      map((response) => {
        console.log(response);
        return new HttpResponse({
          body: response.body || [], // Asegura que siempre devuelva un array aunque esté vacío
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        });
      })
    );
  }

  agregarNuevoVehiculo(
    vehiculo: crearVehiculo
  ): Observable<HttpResponse<vehiculo>> {
    return this.apiService.post<vehiculo>(this.path, vehiculo).pipe(
      map((response) => {
        console.log("Vehículo agregado:", response);
        return new HttpResponse({
          body: response.body,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        });
      })
    );
  }
}

