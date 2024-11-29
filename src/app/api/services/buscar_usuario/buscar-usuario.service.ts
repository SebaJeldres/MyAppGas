import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BuscarUsuarioService {
  private usuario: any = null;

  constructor() {}

  // Método para guardar los datos del usuario
  // En BuscarUsuarioService
setUser(usuario: any) {
  localStorage.setItem('usuario', JSON.stringify(usuario));
}


  // Método para obtener los datos del usuario actual
  getUser() {
    return this.usuario;
  }

  // Método para borrar los datos del usuario (al cerrar sesión)
  clearUser() {
    this.usuario = null;
  }
}
