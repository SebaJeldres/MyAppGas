import { Component, OnInit } from '@angular/core';
import { LoginUsersService } from 'src/app/api/services/users/login-users.service';
import { Users } from 'src/app/models/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  userLogin: Users = {
    username: "",
    password: "",
    rol: "",
    Nombre: "",
    apellido: "",
    Correo: "",
    NumTelefonico: "",
    Direccion: ""
  };

  constructor(private _userLogin: LoginUsersService, private router: Router) { }

  ngOnInit() { }

  login(userLogin: Users) {
    console.log(userLogin);
    const user = this._userLogin.encontrar_usuario(userLogin); // Buscar usuario
    if (user) {
      console.info("Usuario encontrado");
      // Navegar a la página 'home' y pasar el estado (datos del usuario)
      this.router.navigate(['home'], {
        state: {
          x: user.username,  // Pasar el username
          rol: user.rol,     // Pasar el rol del usuario
          nombre: user.Nombre,  // Pasar el nombre
          apellido: user.apellido, // Pasar el apellido
          correo: user.Correo,  // Pasar el correo
          numTelefonico: user.NumTelefonico, // Pasar el número telefónico
          Direccion: user.Direccion
        }
      });
    } else {
      console.error("Usuario no encontrado");
    }
  }
}