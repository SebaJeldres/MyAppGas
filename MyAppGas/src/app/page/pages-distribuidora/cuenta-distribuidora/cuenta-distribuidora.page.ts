import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta-Distribuidora',
  templateUrl: './cuenta-distribuidora.page.html',
  styleUrls: ['./cuenta-distribuidora.page.scss'],
})
export class CuentaDistribuidoraPage implements OnInit {
  username: string | null = null;
  rol: string | null = null;
  nombre: string | null = null;
  apellido: string | null = null;
  correo: string | null = null;
  numTelefonico: string | null = null;
  direccion: string | null = null;
;

  constructor(private router: Router) {}

  ngOnInit() {
    // Recuperar el estado de la navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.username = navigation.extras.state['username'];
      this.rol = navigation.extras.state['rol'];
      this.nombre = navigation.extras.state['nombre'];
      this.apellido = navigation.extras.state['apellido'];
      this.correo = navigation.extras.state['correo'];
      this.numTelefonico = navigation.extras.state['numTelefonico'];
      this.direccion = navigation.extras.state['Direccion'];

    }
  }

}
