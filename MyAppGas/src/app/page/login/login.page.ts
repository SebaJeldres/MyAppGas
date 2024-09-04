import { Component, OnInit } from '@angular/core';
import { LoginUsersService } from 'src/app/api/services/login-users.service';
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
    rol: ""
  };

  constructor(private _userLogin: LoginUsersService, private router: Router) { }

  ngOnInit() { }

  login(userLogin: Users) {
    console.log(userLogin);
    const user = this._userLogin.encontrar_usuario(userLogin);
    if (user) {
      console.info("Usuario encontrado");
      this.router.navigate(['home'], {
        state: {
          x: user.username,
          rol: user.rol // Pasar el rol del usuario
        }
      });
    } else {
      console.error("Usuario no encontrado");
    }
  }
}
