import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuscarUsuarioService {

  private userData: any = null;

  setUser(data: any) {
    this.userData = data;
  }

  getUser() {
    return this.userData;
  }

  clearUser() {
    this.userData = null;
  }
}
