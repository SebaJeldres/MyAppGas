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
}
