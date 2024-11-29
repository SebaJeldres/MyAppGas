import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/services/user/user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BuscarUsuarioService } from 'src/app/api/services/buscar_usuario/buscar-usuario.service';

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
    private alertController: AlertController,
    private buscarUsuarioService: BuscarUsuarioService // Uso del servicio compartido para manejar al usuario
  ) {}

  ngOnInit() {}

  // Método para redirigir a la página de registro
  Registro() {
    this.router.navigate(['registro']);
  }

  // Método para iniciar sesión
  async iniciarSesion() {
    const { username, password } = this.userLogin;

    if (!username || !password) {
      this.mostrarAlerta('Error', 'Por favor ingrese sus credenciales.');
      return;
    }

    // Llama al método `validarCredenciales` del servicio `UserService` para validar al usuario
    this.userService.validarCredenciales(username, password).subscribe({
      next: (usuario) => {
        if (usuario) {
          // Almacenar los datos del usuario en el servicio compartido `BuscarUsuarioService`
          this.buscarUsuarioService.setUser(usuario);

          console.log('Usuario autenticado:', usuario);

          // Redirigir al home
          this.router.navigate(['/home']);
          
          // Limpiar los campos de login después de la autenticación exitosa
          this.userLogin = { username: '', password: '' };
        } else {
          // Mostrar alerta si las credenciales son incorrectas
          this.mostrarAlerta('Error', 'Credenciales inválidas. Por favor intente de nuevo.');
        }
      },
      error: (err) => {
        console.error('Error al validar credenciales:', err);
        this.mostrarAlerta('Error', 'Ocurrió un problema al iniciar sesión.');
      },
    });
  }

  // Método para cerrar sesión
  cerrarSesion() {
    // Limpiar los campos de login
    this.userLogin = { username: '', password: '' };

    // Redirigir al login
    this.router.navigate(['/login']);
  }

  // Método para mostrar alertas al usuario
  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
