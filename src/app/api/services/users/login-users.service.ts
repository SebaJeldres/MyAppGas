import { Injectable } from '@angular/core';
import { Users } from 'src/app/models/users';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class LoginUsersService {
  private secretKey = 'My1RaAp9M081L'; // Llave de encriptación

  lista_de_usuarios: Users[] = [];

  constructor() {
    this.lista_de_usuarios = [
      {
        id: "1",
        username: "Dario_user",
        password: this.encryptPassword('Dario1'),
        rol: "usuario",
        Nombre: "Dario",
        apellido: "Osorio",
        Correo: "Dario.osorio@gmail.com",
        NumTelefonico: "+56 9 0786 4635",
        Direccion: "Belloto norte, las parcelas, 555",
        latitude: -33.007182, // Coordenada inicial (Chile como ejemplo)
        longitude: -71.498390,
      },
      {
        id: "2",
        username: "Jose_Repartidor",
        password: this.encryptPassword('Jose1'),
        rol: "repartidor",
        Nombre: "Jose",
        apellido: "Gonzales",
        Correo: "Jose.gonzales@gmail.com",
        NumTelefonico: "+56 9 6353 4477",
        Direccion: "Belloto norte, las parcelas, 555",
        latitude: -33.007182, // Coordenada inicial (Chile como ejemplo)
        longitude: -71.498390,
      },
      {
        id: "3",
        username: "Carlos_admin",
        password: this.encryptPassword('Carlos1'),
        rol: "distribuidora",
        Nombre: "Carlos",
        apellido: "Dominguez",
        Correo: "Carlos.dominguez@gmail.com",
        NumTelefonico: "+56 8898 9000",
        Direccion: "Belloto norte, las parcelas, 555",
        latitude: -33.0469,
        longitude: -71.6153,
      },
    ];
  }

  // Método para cifrar la contraseña
  private encryptPassword(password: string): string {
    console.log('Texto original antes de encriptar:', password);
    const encryptedPassword = CryptoJS.AES.encrypt(password, this.secretKey).toString();
    console.log('Texto encriptado:', encryptedPassword);
    return encryptedPassword;
  }

  // Método para descifrar la contraseña
  private decryptPassword(encryptedPassword: string): string {
    console.log('Texto encriptado antes de desencriptar:', encryptedPassword);
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, this.secretKey);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    console.log('Texto desencriptado:', originalPassword);
    return originalPassword;
  }

  // Buscar usuario por credenciales
  encontrar_usuario(userInfo: Users): Users | null {
    for (let usuario of this.lista_de_usuarios) {
      if (
        usuario.username === userInfo.username &&
        this.decryptPassword(usuario.password) === userInfo.password
      ) {
        return usuario; // Devuelve el objeto del usuario encontrado
      }
    }
    return null; // Devuelve null si no se encuentra el usuario
  }

  // Obtener usuario por ID
  getUserById(userId: string): Users | null {
    return this.lista_de_usuarios.find(user => user.id === userId) || null;
  }

  // Actualizar ubicación del usuario
  updateUserLocation(userId: string, latitude: number, longitude: number): void {
    const user = this.getUserById(userId);
    if (user) {
      user.latitude = latitude;
      user.longitude = longitude;
      console.log(`Ubicación actualizada para ${user.username}:`, { latitude, longitude });
    }
  }

  // Simular movimiento del repartidor
  simulateRepartidorMovement(repartidorId: string): void {
    const repartidor = this.getUserById(repartidorId);
    if (repartidor) {
      setInterval(() => {
        repartidor.latitude = (repartidor.latitude || 0) + Math.random() * 0.001;
        repartidor.longitude = (repartidor.longitude || 0) + Math.random() * 0.001;
        console.log(`Nueva ubicación del repartidor ${repartidor.username}:`, {
          latitude: repartidor.latitude,
          longitude: repartidor.longitude,
        });
      }, 5000); // Actualiza cada 5 segundos
    }
  }
}
