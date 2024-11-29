import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/services/user/user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BuscarUsuarioService } from 'src/app/api/services/buscar_usuario/buscar-usuario.service'; // Cambié el nombre del servicio

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
    private buscarUsuarioService: BuscarUsuarioService // Uso del servicio renombrado
  ) {}

  ngOnInit() {}

  Registro() {
    this.router.navigate(['registro']);
  }

  async iniciarSesion() {
    const { username, password } = this.userLogin;

    if (!username || !password) {
      this.mostrarAlerta('Error', 'Por favor ingrese sus credenciales.');
      return;
    }

    // Cambié el servicio 'validarCredenciales' por 'buscar_user' en el servicio 'UserService'
    this.userService.validarCredenciales(username, password).subscribe({
      next: (usuario) => {
        if (usuario) {
          // Almacenar los datos del usuario en el servicio compartido
          this.buscarUsuarioService.setUser(usuario); // Esto puede guardar el usuario en un servicio compartido

          console.log('Usuario autenticado:', usuario);
          // Redirigir al home independientemente del rol
          this.router.navigate(['/home']);
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
