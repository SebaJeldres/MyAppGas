import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/services/user/user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userLogin = { username: '', password: '' };

  constructor(
    private userService: UserService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  Registro() {
    this.router.navigate(['registro'], {
      
    });
  }

  async iniciarSesion() {
    const { username, password } = this.userLogin;
  
    if (!username || !password) {
      this.mostrarAlerta('Error', 'Por favor ingrese sus credenciales.');
      return;
    }
  
    this.userService.validarCredenciales(username, password).subscribe({
      next: (usuario) => {
        if (usuario) {
          console.log('Usuario autenticado:', usuario);
          if (usuario.rol === 'usuario') {
            this.router.navigate(['/home']);
          } else if (usuario.rol === 'distribuidora') {
            this.router.navigate(['/home']);
          } else if (usuario.rol === 'repartidor') {
            this.router.navigate(['/home']);
          }
        } else {
          this.mostrarAlerta('Error', 'Credenciales inválidas. Por favor intente de nuevo.');
        }
      },
      error: (err) => {
        console.error('Error al validar credenciales:', err);
        this.mostrarAlerta('Error', 'Ocurrió un problema al iniciar sesión.');
      },
    });
  }
  

  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
