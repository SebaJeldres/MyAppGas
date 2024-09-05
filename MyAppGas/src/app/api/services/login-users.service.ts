import { Injectable } from '@angular/core';
import { Users } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class LoginUsersService {

  lista_de_usuarios: Users[] = [
    {
      username: "Dario_user",
      password: "Dario1",
      rol: "usuario",
      Nombre: "Dario ",
      apellido: "Osorio",
      Correo: "Dario.osorio@gmail.com",
      NumTelefonico: "+56 9 0786 4635"
    },
    {
      username: "Jose_Repartidor",
      password: "Jose1",
      rol: "Repartidor",
      Nombre: "Jose",
      apellido: "Gonzales",
      Correo: "Jose.gonzales@gmail.com",
      NumTelefonico: "+56 9 6353 4477"
    },
    {
      username: "Carlos_admin",
      password: "Carlos1",
      rol: "Distribuidora",
      Nombre: "Carlos",
      apellido: "Dominguez",
      Correo: "Carlos.dominguez@gmail.com",
      NumTelefonico: "+56 8898 9000"
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
