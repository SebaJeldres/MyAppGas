import { Injectable } from '@angular/core';
import { user } from 'src/app/models/user';
import { ApiConfigService } from '../api-config/api-config.service';
import { HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { crearUser } from 'src/app/models/crearUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  path = 'user'; // Ruta base para la API de usuarios

  constructor(private apiService: ApiConfigService) {}

  // Obtener todos los usuarios con un parámetro de filtro
  obtener_users(params?: any): Observable<user[]> {
    return this.apiService.get<user[]>(this.path, params).pipe(
      map((response) => response.body || [])
    );
  }

  // Agregar un nuevo usuario
  agregarNuevoUsuario(user: crearUser): Observable<HttpResponse<user>> {
    return this.apiService.post(this.path, user);
  }

  // Validar las credenciales de un usuario usando una ruta basada en segmentos
  validarCredenciales(username: string, password: string): Observable<user | null> {
    const params = {
      username: `eq.${username}`,
      password: `eq.${password}`
    };

    // Solicitar la API con parámetros en la consulta
    return this.apiService.get<user[]>('user', params).pipe(
      map((response) => {
        const usuarios = response.body || [];
        return usuarios.length > 0 ? usuarios[0] : null; // Si hay usuarios, devuelve el primero, sino, null
      })
    );
  }

  // Obtener un usuario por su ID
  getUserById(userId: string): Observable<user | null> {
    const endpoint = `${this.path}?id=eq.${userId}`; // ID como parte de la ruta
    return this.apiService.get<user[]>(endpoint).pipe(
      map((response) => {
        const usuarios = response.body || [];
        return usuarios.length > 0 ? usuarios[0] : null; // Retorna el primer usuario encontrado
      })
    );
  }

  // Obtener el usuario logueado (de localStorage o similar)
  getLoggedUser(): Observable<user | null> {
    const loggedUser = localStorage.getItem('loggedUser');
    return new Observable((observer) => {
      if (loggedUser) {
        observer.next(JSON.parse(loggedUser));
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  }

  // Setear un usuario en el storage (cuando inicia sesión)
  setLoggedUser(user: user) {
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  // Eliminar el usuario de la sesión cuando cierre sesión
  removeLoggedUser() {
    localStorage.removeItem('loggedUser');
  }

  limpiarSesion() {
    // Limpia los datos almacenados en la sesión, como el rol y el nombre de usuario
    localStorage.removeItem('usuario'); // Si usas localStorage para almacenar la sesión
    sessionStorage.removeItem('usuario'); // Si usas sessionStorage

    // También puedes reiniciar cualquier variable relevante aquí si es necesario
  }
}
