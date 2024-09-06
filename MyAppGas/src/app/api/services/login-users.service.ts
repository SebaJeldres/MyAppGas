import { Injectable } from '@angular/core';
import { Users } from 'src/app/models/users';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class LoginUsersService {
  private secretKey = 'My1RaAp9M081L'; //"llave de la encryptacion"

  lista_de_usuarios: Users[] = [
    {
<<<<<<< HEAD
      username: 'Dario',
      password: this.encryptPassword('Dario1'),
      rol: 'usuario',
    },
    {
      username: 'Jose',
      password: this.encryptPassword('Jose1'),
      rol: 'Repartidor',
    },
    {
      username: 'Carlos',
      password: this.encryptPassword('Carlos1'),
      rol: 'Admin Distr.',
    },
=======
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
>>>>>>> 00872833bba05eee399e9b3a772f3b5bd22212ba
  ];

  constructor() {}

  // Método para cifrar la contraseña
  private encryptPassword(password: string): string {
    console.log('Texto original antes de encriptar:', password);
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      this.secretKey
    ).toString();
    console.log('Texto encriptado:', encryptedPassword);
    return encryptedPassword;
  }

  // Método para verificar la contraseña
  private decryptPassword(encryptedPassword: string): string {
    console.log('Texto encriptado antes de desencriptar:', encryptedPassword);
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, this.secretKey);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    console.log('Texto desencriptado:', originalPassword);
    return originalPassword;
  }

  encontrar_usuario(userInfo: Users): Users | null {
    for (let i = 0; i < this.lista_de_usuarios.length; i++) {
      if (
        this.lista_de_usuarios[i].username === userInfo.username &&
        this.decryptPassword(this.lista_de_usuarios[i].password) ===
          userInfo.password
      ) {
        return this.lista_de_usuarios[i]; // Devuelve el objeto del usuario encontrado
      }
    }
    return null; // Devuelve null si no se encuentra el usuario
  }
}
