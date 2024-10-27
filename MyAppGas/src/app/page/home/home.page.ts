import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  id: string | null = null;
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
      this.id= navigation.extras.state['id']
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
        id: this.id,
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
        id: this.id,
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
        id: this.id,
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

  // Método en HomePage para navegar a InformacionVehiculoPage
irAInformacionVehiculo() {
  this.router.navigate(['informacion-vehiculo'], {
    state: {
      id: this.id // Asegúrate de que 'this.id' tiene el valor correcto
    }
  });
}

}


