import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { PedidoService } from 'src/app/api/services/pedido/pedido.service';
import { LoginUsersService } from 'src/app/api/services/users/login-users.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
})
export class DetallePedidoPage implements OnInit, AfterViewInit {
  pedidoForm: FormGroup;
  username: string | null = null;

  // Propiedades para el mapa y el marcador
  private map!: google.maps.Map;
  private marker!: google.maps.Marker;
  private initialLocation: google.maps.LatLngLiteral = { lat: -33.007182, lng: -71.498390}; // Coordenadas fijas de Viña del Mar, puedes cambiarlo a la ubicación deseada
  private isMapInitialized: boolean = false; // Bandera para verificar si el mapa está inicializado

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private pedidoService: PedidoService,
    private alertController: AlertController,
    private loginUsersService: LoginUsersService,
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
        });

        const usuarioId = '1'; // Aquí deberías obtener dinámicamente el ID del usuario (repartidor)
        if (this.isMapInitialized) {
          this.showUserLocation(usuarioId); // Llamar para mostrar la ubicación del usuario
        }
    
      }
    }
  }

  ngAfterViewInit(): void {
    this.initMap(); // Inicializamos el mapa cuando el componente está listo
  }

  private initMap(): void {
    // Inicializamos el mapa de Google
    const mapOptions: google.maps.MapOptions = {
      center: this.initialLocation,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    // Creamos el marcador inicial en la ubicación de Viña del Mar
    this.marker = new google.maps.Marker({
      position: this.initialLocation,
      map: this.map,
      // Eliminamos la propiedad 'title' para que no aparezca texto sobre el marcador
    });

    // Marcamos el mapa como inicializado
    this.isMapInitialized = true;
  }

  // Función para obtener y mostrar la ubicación del repartidor
  private showUserLocation(usuarioId: string): void {
    if (!this.isMapInitialized) {
      console.error("El mapa no está inicializado.");
      return;
    }

    // Simulamos obtener la ubicación del usuario (deberías hacerlo con una API o WebSocket real)
    const usuario = this.loginUsersService.getUserById(usuarioId);

    if (usuario && usuario.latitude && usuario.longitude) {
      const usuarioLocation: google.maps.LatLngLiteral = { lat: usuario.latitude, lng: usuario.longitude };
      this.updateMarker(usuarioLocation); // Mostramos la ubicación del repartidor en el mapa
    } else {
      console.error("Ubicación del usuario no disponible");
    }
  }

  // Actualizar el marcador en el mapa
  private updateMarker(location: google.maps.LatLngLiteral): void {
    if (this.marker) {
      this.marker.setPosition(location); // Cambiar la ubicación del marcador
      this.map.setCenter(location); // Centrar el mapa en la nueva ubicación solo cuando sea necesario

     // Texto que aparecerá al hacer clic en el marcador
      };
     
  }

  // Simulación de actualización en tiempo real de la ubicación del repartidor
  private startLocationPolling(): void {
    setInterval(() => {
      const usuarioId = '1'; // Obtén el ID del repartidor
      this.showUserLocation(usuarioId); // Actualiza la ubicación cada 5 segundos (puedes ajustarlo)
    }, 5000); // Intervalo de 5 segundos (ajusta según lo necesario)
  }

  // Método para actualizar el pedido
  actualizarPedido() {
    const pedidoId = this.pedidoForm.get('id')?.value;
    const nuevaPatente = this.pedidoForm.get('patente')?.value;
  
    if (pedidoId && nuevaPatente) {
      this.pedidoService
        .actualizarPedido(pedidoId, { patente: nuevaPatente, estado: 'Camino' })
        .subscribe({
          next: async () => {
            const alert = await this.alertController.create({
              header: 'Éxito',
              message: 'La patente y el estado del pedido fueron actualizados correctamente.',
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
        message: 'Por favor, ingrese una patente válida antes de continuar.',
        buttons: ['OK'],
      }).then(alert => alert.present());
    }
  }
}
