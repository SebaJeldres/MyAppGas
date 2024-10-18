import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  username: string | null = null;
  rol: string | null = null;
  Nombre: string | null = null
  apellido: string | null = null
  Correo: string | null = null
  NumTelefonico: string | null = null
  Direccion: string | null = null

  constructor(private router: Router) { }

  ngOnInit() {
    // Recuperar el estado de la navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.username = navigation.extras.state['x'];
      this.rol = navigation.extras.state['rol'] || 'No definido';
      this.Nombre = navigation.extras.state['nombre'] || '';
      this.apellido = navigation.extras.state['apellido'] || '';
      this.Correo = navigation.extras.state['correo'] || '';
      this.NumTelefonico = navigation.extras.state['numTelefonico'] || '';
      this.Direccion = navigation.extras.state['Direccion'] || '';
    }
  }

  // Método para navegar a la página de perfil de usuario
  irAPerfilUser() {
    this.router.navigate(['cuenta-usuario'], {
      state: {
        username: this.username,
        rol: this.rol,
        nombre: this.Nombre,
        apellido: this.apellido,
        correo: this.Correo,
        numTelefonico: this.NumTelefonico,
        Direccion: this.Direccion
      }
    });
  }

  irAPerfilRepartidor() {
    this.router.navigate(['cuenta-repartidor'], {
      state: {
        username: this.username,
        rol: this.rol,
        nombre: this.Nombre,
        apellido: this.apellido,
        correo: this.Correo,
        numTelefonico: this.NumTelefonico,
        Direccion: this.Direccion
      }
    });
  }

  irAPerfilDistribuidora() {
    this.router.navigate(['cuenta-distribuidora'], {
      state: {
        username: this.username,
        rol: this.rol,
        nombre: this.Nombre,
        apellido: this.apellido,
        correo: this.Correo,
        numTelefonico: this.NumTelefonico,
        Direccion: this.Direccion
      }
    });
  }
}


