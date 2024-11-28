import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { PedidoService } from 'src/app/api/services/pedido/pedido.service';
import { LoginUsersService } from 'src/app/api/services/users/login-users.service';

@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.page.html',
  styleUrls: ['./boleta.page.scss'],
})
export class BoletaPage implements OnInit, AfterViewInit {
  pedidoForm: FormGroup;
  rol: string | null = null;

  // Propiedades para el mapa y el marcador
  private map!: google.maps.Map;
  private marker!: google.maps.Marker;
  private initialLocation: google.maps.LatLngLiteral = { lat: -33.4691, lng: -71.5771 }; // Viña del Mar, Centro
  private isMapInitialized: boolean = false; // Bandera para verificar si el mapa está inicializado

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private pedidoService: PedidoService,
    private loginUsersService: LoginUsersService,
    private alertController: AlertController
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
      this.rol = navigation.extras.state['rol'];
      console.log('Rol recibido:', this.rol);
    }

    if (navigation?.extras?.state) {
      const pedido = navigation.extras.state['pedido'];
      if (pedido) {
        this.pedidoForm.patchValue({
          id: pedido.id,
          monto_total: pedido.monto_total,
          nombre_usuario: pedido.nombre_usuario,
          direccion_entrega: pedido.direccion,
          hora_ini: pedido.hora_ini,
          numtelefonico: pedido.num_telefonico,
          detalle_pedido: pedido.detalle_pedido,
          nombre_repartidor: pedido.nombre_repartidor,
          metodo_pago: pedido.metodo_pago,
          patente: pedido.patente,
        });

        // Llamar para mostrar la ubicación del usuario solo si el mapa está inicializado
        const repartidorId = '2'; // Aquí deberías obtener dinámicamente el ID del usuario (repartidor)
        if (this.isMapInitialized) {
          this.showUserLocation(repartidorId); // Llamar para mostrar la ubicación del usuario
        }
      }
    }
  }

  ngAfterViewInit(): void {
    this.initMap(); // Inicializamos el mapa cuando el componente está listo
    this.startLocationPolling(); // Iniciar la actualización de la ubicación del repartidor
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
  private showUserLocation(repartidorId: string): void {
    if (!this.isMapInitialized) {
      console.error("El mapa no está inicializado.");
      return;
    }

    // Simulamos obtener la ubicación del usuario (deberías hacerlo con una API o WebSocket real)
    const repartidor = this.loginUsersService.getUserById(repartidorId);

    if (repartidor && repartidor.latitude && repartidor.longitude) {
      const repartidorLocation: google.maps.LatLngLiteral = { lat: repartidor.latitude, lng: repartidor.longitude };
      this.updateMarker(repartidorLocation); // Mostramos la ubicación del repartidor en el mapa
    } else {
      console.error("Ubicación del repartidor no disponible");
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
      const repartidorId = '2'; // Obtén el ID del repartidor
      this.showUserLocation(repartidorId); // Actualiza la ubicación cada 5 segundos (puedes ajustarlo)
    }, 5000); // Intervalo de 5 segundos (ajusta según lo necesario)
  }

  // Métodos para actualizar el estado del pedido (lógica original)
  actualizarPedido1() {
    const pedidoId = this.pedidoForm.get('id')?.value;

    if (!pedidoId) {
      this.alertController
        .create({
          header: 'Error',
          message: 'No se pudo encontrar un ID de pedido válido.',
          buttons: ['OK'],
        })
        .then((alert) => alert.present());
      return;
    }

    this.pedidoService
      .actualizarPedido1(pedidoId, { estado: 'Entregado' })
      .subscribe({
        next: async () => {
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'El estado del pedido fue actualizado a "Entregado" correctamente.',
            buttons: ['OK'],
          });
          await alert.present();
        },
        error: async (error) => {
          console.error('Error al actualizar el pedido:', error);
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Ocurrió un error al actualizar el estado del pedido.',
            buttons: ['OK'],
          });
          await alert.present();
        },
      });
  }

  actualizarPedido2() {
    const pedidoId = this.pedidoForm.get('id')?.value;

    if (!pedidoId) {
      this.alertController
        .create({
          header: 'Error',
          message: 'No se pudo encontrar un ID de pedido válido.',
          buttons: ['OK'],
        })
        .then((alert) => alert.present());
      return;
    }

    this.pedidoService
      .actualizarPedido1(pedidoId, { estado: 'Cancelado' })
      .subscribe({
        next: async () => {
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'El estado del pedido fue actualizado a "Cancelado" correctamente.',
            buttons: ['OK'],
          });
          await alert.present();
        },
        error: async (error) => {
          console.error('Error al actualizar el pedido:', error);
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Ocurrió un error al actualizar el estado del pedido.',
            buttons: ['OK'],
          });
          await alert.present();
        },
      });
  }
}
