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

  constructor(private router: Router) { }

  ngOnInit() {
    // Recuperar el estado de la navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.username = navigation.extras.state['x'];
      // Si el rol también se pasa como estado, recupéralo aquí
      this.rol = navigation.extras.state['rol'] || 'No definido'; // Cambia 'No definido' por un valor predeterminado adecuado
    }
  }
}

