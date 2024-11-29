import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { PedidoService } from 'src/app/api/services/pedido/pedido.service';
import { UserService } from 'src/app/api/services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
})
export class DetallePedidoPage implements OnInit, AfterViewInit, OnDestroy {
  pedidoForm: FormGroup;
  username: string | null = null;

  // Propiedades para el mapa y el marcador
  private map!: google.maps.Map;
  private marker!: google.maps.Marker;
  private initialLocation: google.maps.LatLngLiteral = { lat: -33.007182, lng: -71.498390 }; // Coordenadas fijas de Viña del Mar
  private isMapInitialized: boolean = false; // Bandera para verificar si el mapa está inicializado
  private userLocationSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private pedidoService: PedidoService,
    private alertController: AlertController,
    private UsersService: UserService,
  ) {
    this.pedidoForm = this.formBuilder.group({
      id: [''],
      monto_total: [''],
      nombre_usuario: [''],
      direccion_entrega: [''],
      metodo_pago: [''],
      numtelefonico: [''],
      hora_ini: [''],
      detalle_pedido: [''],
      nombre_repartidor: [''],
      patente: [''],
      latitude: [''],
      longitude: [''],
      latitude_r: [''],
      longitude_r: ['']
    });
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.username = navigation.extras.state['rol'];
    }

    if (navigation?.extras?.state) {
      const pedido = navigation.extras.state['pedido'];
      if (pedido) {
        this.pedidoForm.patchValue({
          id: pedido.id,
          monto_total: pedido.monto_total,
          nombre_usuario: pedido.nombre_usuario,
          direccion_entrega: pedido.direccion,
          metodo_pago: pedido.metodo_pago,
          numtelefonico: pedido.num_telefonico,
          hora_ini: pedido.hora_ini,
          detalle_pedido: pedido.detalle_pedido,
          nombre_repartidor: pedido.nombre_repartidor || '', // Campo opcional
          patente: pedido.patente || '', // Campo opcional
          latitude: pedido.latitude,
          longitude: pedido.longitude, 
          latitude_r: null, // Inicializamos en null, pero se actualizará más tarde
          longitude_r: null, // Inicializamos en null, pero se actualizará más tarde
        });

        // Si las coordenadas del pedido están disponibles, actualizamos la ubicación del mapa
        if (pedido.latitude && pedido.longitude) {
          this.initialLocation = { lat: pedido.latitude, lng: pedido.longitude };
          if (this.isMapInitialized) {
            this.updateMarker(this.initialLocation); // Actualiza la ubicación del mapa con las coordenadas del pedido
          }
        }

        const usuarioId = '3'; // Aquí deberías obtener dinámicamente el ID del usuario (repartidor)
        if (this.isMapInitialized) {
          this.showUserLocation(usuarioId); // Llamar para mostrar la ubicación del usuario
        }
      }
    }
  }

  ngAfterViewInit(): void {
    this.initMap(); // Inicializamos el mapa cuando el componente está listo
    this.startLocationPolling(); // Comenzamos a actualizar la ubicación del repartidor
    this.getUserLocation(); // Llamamos para obtener la ubicación del repartidor
  }

  ngOnDestroy(): void {
    if (this.userLocationSubscription) {
      this.userLocationSubscription.unsubscribe(); // Limpiamos la suscripción cuando el componente se destruye
    }
  }

  private initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: this.initialLocation, 
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    this.marker = new google.maps.Marker({
      position: this.initialLocation,
      map: this.map,
    });

    this.isMapInitialized = true;
  }

  private showUserLocation(usuarioId: string): void {
    if (!this.isMapInitialized) {
      console.error("El mapa no está inicializado.");
      return;
    }

    this.userLocationSubscription = this.UsersService.getUserById(usuarioId).subscribe(user => {
      if (user && user.latitude && user.longitude) {
        const usuarioLocation: google.maps.LatLngLiteral = { lat: user.latitude, lng: user.longitude };
        this.updateMarker(usuarioLocation);

        // Actualizar los valores de latitude_r y longitude_r en el formulario

      } else {
        console.error("Ubicación del usuario no disponible");
      }
    });
  }

  private updateMarker(location: google.maps.LatLngLiteral): void {
    if (this.marker) {
      this.marker.setPosition(location); 
      this.map.setCenter(location); 
    }
  }

  private startLocationPolling(): void {
    setInterval(() => {
      const usuarioId = '3'; // Obtén el ID del repartidor
      this.showUserLocation(usuarioId); // Actualiza la ubicación cada 5 segundos
    }, 5000);
  }

  // Método para obtener la ubicación actual del usuario utilizando la API de geolocalización
  private getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude_nueva = position.coords.latitude;
          const longitude_nueva = position.coords.longitude;

          // Preguntar si se permite usar la ubicación
          const alert = await this.alertController.create({
            header: 'Ubicación detectada',
            message: '¿Quieres usar esta ubicación para el repartidor?',
            buttons: [
              {
                text: 'Sí',
                handler: () => {
                  // Permitir usar la ubicación y actualizar el formulario
                  this.pedidoForm.patchValue({
                    latitude_r: latitude_nueva,  // Actualiza latitude_r
                    longitude_r: longitude_nueva // Actualiza longitude_r
                  });

                  // Verificar que los valores se hayan actualizado correctamente
                  console.log("Ubicación aceptada:", latitude_nueva, longitude_nueva);
                },
              },
              {
                text: 'No',
                handler: () => {
                  console.log('El usuario rechazó usar la ubicación');
                },
              },
            ],
          });
          await alert.present();
        },
        async (error) => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'No se pudo obtener la ubicación. Por favor, habilita el GPS.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      );
    } else {
      alert("Geolocalización no es compatible con este navegador.");
    }
  }

  // Método para actualizar el pedido
  actualizarPedido() {
    const pedidoId = this.pedidoForm.get('id')?.value;
    const nuevaPatente = this.pedidoForm.get('patente')?.value;
    const nombreRepartidor = this.pedidoForm.get('nombre_repartidor')?.value;
    const latitude_r = this.pedidoForm.get('latitude_r')?.value;
    const longitude_r = this.pedidoForm.get('longitude_r')?.value;

    // Verificación de que latitude_r y longitude_r no están vacíos
    if (pedidoId && nuevaPatente && nombreRepartidor && latitude_r && longitude_r) {
      // Actualizamos el pedido con los campos adicionales
      this.pedidoService
        .actualizarPedido(pedidoId, { 
          patente: nuevaPatente, 
          nombre_repartidor: nombreRepartidor, 
          estado: 'Camino', 
          latitude_r, 
          longitude_r 
        })
        .subscribe({
          next: async () => {
            const alert = await this.alertController.create({
              header: 'Éxito',
              message: 'La patente, el nombre del repartidor, el estado del pedido y la ubicación del repartidor fueron actualizados correctamente.',
              buttons: ['OK'],
            });
            await alert.present();
          },
          error: async (error) => {
            console.error('Error al actualizar el pedido:', error);
            const alert = await this.alertController.create({
              header: 'Error',
              message: 'Ocurrió un error al actualizar el pedido.',
              buttons: ['OK'],
            });
            await alert.present();
          },
        });
    } else {
      this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingrese una patente válida y asegúrese de que la ubicación del repartidor esté disponible.',
        buttons: ['OK'],
      }).then(alert => alert.present());
    }
  }
}
