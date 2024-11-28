import { Component, OnInit } from '@angular/core';
import { crearUser } from 'src/app/models/crearUser';
import { UserService } from 'src/app/api/services/user/user.service';
import { firstValueFrom } from 'rxjs';
import { user } from 'src/app/models/user';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  // Datos del nuevo usuario
  nuevo_user: crearUser = {
    username: '',
    password: '',
    rol: '',
    nombre: '',
    apellido: '',
    correo: '',
    num_telefonico: '',
    direccion: '',
    latitude: 0,
    longitude: 0,
  };

  private map!: google.maps.Map; // Referencia al mapa
  private marker!: google.maps.Marker; // Marcador en el mapa

  constructor(private _serviceUser: UserService) {}

  ngOnInit(): void {
    this.initMap();
  }

  // Inicializar el mapa
  private initMap(): void {
    const initialLocation = { lat: -33.4691, lng: -71.5771 }; // Coordenadas iniciales

    // Opciones del mapa
    const mapOptions: google.maps.MapOptions = {
      center: initialLocation,
      zoom: 15,
    };

    // Crear el mapa
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    // Crear un marcador inicial
    this.marker = new google.maps.Marker({
      position: initialLocation,
      map: this.map,
      title: 'Ubicación seleccionada',
      draggable: true, // Permitir mover el marcador
    });

    // Actualizar coordenadas al mover el marcador
    this.marker.addListener('dragend', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        this.nuevo_user.latitude = event.latLng.lat();
        this.nuevo_user.longitude = event.latLng.lng();
      }
    });

    // Actualizar marcador y coordenadas al hacer clic en el mapa
    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        this.marker.setPosition(event.latLng);
        this.nuevo_user.latitude = event.latLng.lat();
        this.nuevo_user.longitude = event.latLng.lng();
      }
    });
  }

  async agregarUsuario() {
    // No enviamos el 'id' ya que es autogenerado por Supabase
    const response: HttpResponse<user> = await firstValueFrom(this._serviceUser.agregarNuevoUsuario(this.nuevo_user));
    
  }
}
