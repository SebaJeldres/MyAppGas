import { Injectable } from '@angular/core';
import { Users } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class LoginUsersService {

  lista_de_usuarios: Users[] = [
    {
      username: "Dario",
      password: "Dario1",
      rol: "usuario"
    },
    {
      username: "Jose",
      password: "Jose1",
      rol: "Repartidor"
    },
    {
      username: "Carlos",
      password: "Carlos1",
      rol: "Admin Distr."
    }
  ];

  constructor() { }

  encontrar_usuario(userInfo: Users): Users | null {
    for (let i = 0; i < this.lista_de_usuarios.length; i++) {
      if (this.lista_de_usuarios[i].username === userInfo.username && this.lista_de_usuarios[i].password === userInfo.password) {
        return this.lista_de_usuarios[i]; // Devuelve el objeto del usuario encontrado
      }
    }
    return null; // Devuelve null si no se encuentra el usuario
  }
}
