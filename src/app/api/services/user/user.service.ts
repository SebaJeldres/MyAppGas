import { Injectable } from '@angular/core';
import { user } from 'src/app/models/user';
import { ApiConfigService } from '../api-config/api-config.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { crearUser } from 'src/app/models/crearUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  path = 'user'; // Ruta de la API de usuarios

  constructor(private apiService: ApiConfigService) { }

  // Obtener todos los usuarios con un parámetro de filtro (actual ya existente)
  obtener_users(params: HttpParams): Observable<user[]> {
    return this.apiService.get<user[]>(this.path, params).pipe(
      map((response) => response.body || [])
    );
  }

  // Agregar un nuevo usuario (actual ya existente)
  agregarNuevoUsuario(user: crearUser): Observable<HttpResponse<user>> {
    return this.apiService.post(this.path, user);
  }

  // Validar las credenciales de un usuario usando el método obtener_users()
  validarCredenciales(username: string, password: string): Observable<user | null> {
    const params = new HttpParams()
      .set('username', `iq.${username}`)
      .set('password', `iq.${password}`);

    // Usamos obtener_users para buscar usuarios con los parámetros proporcionados
    return this.obtener_users(params).pipe(
      map((usuarios) => {
        return usuarios.length > 0 ? usuarios[0] : null; // Si hay usuarios, devuelve el primero, sino, null
      })
    );
  }

  // Obtener un usuario por su ID
  getUserById(userId: string): Observable<user | null> {
    const params = new HttpParams().set('id', userId); // Se agrega el userId como parámetro
    
    // Usamos get de ApiConfigService con params en un objeto
    return this.apiService.get<user[]>(this.path, params).pipe(
      map((response) => {
        const usuarios = response.body || [];
        return usuarios.length > 0 ? usuarios[0] : null; // Retorna el primer usuario encontrado
      })
    );
  }
}
