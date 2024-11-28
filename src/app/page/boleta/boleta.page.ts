import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { PedidoService } from 'src/app/api/services/pedido/pedido.service';
import { UserService } from 'src/app/api/services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.page.html',
  styleUrls: ['./boleta.page.scss'],
})
export class BoletaPage implements OnInit, AfterViewInit, OnDestroy {
  pedidoForm: FormGroup;
  rol: string | null = null;
  private isMapInitialized: boolean = false; // Bandera para verificar si el mapa está inicializado
  private userLocationSubscription!: Subscription;

  private initialLocation: google.maps.LatLngLiteral = { lat: -33.4691, lng: -71.5771 }; // Default (Viña del Mar)

  // Definir el mapa y el marcador como propiedades de la clase
  private map!: google.maps.Map;
  private marker!: google.maps.Marker;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private pedidoService: PedidoService,
    private userService: UserService,
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

        // Actualizamos la ubicación inicial usando latitud y longitud del pedido
        const latitud = pedido.latitud; // Asumimos que el pedido tiene latitud
        const longitud = pedido.longitud; // Asumimos que el pedido tiene longitud
        if (latitud && longitud) {
          this.initialLocation = { lat: latitud, lng: longitud };
        }
      }
    }
  }

  ngAfterViewInit(): void {
    this.initMap(); // Inicializamos el mapa cuando el componente está listo
    this.startLocationPolling(); // Iniciar la actualización de la ubicación del repartidor
  }

  private initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: this.initialLocation,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    const mapElement = document.getElementById('map') as HTMLElement;
    if (mapElement) {
      this.map = new google.maps.Map(mapElement, mapOptions); // Asignamos el mapa a la propiedad
      this.marker = new google.maps.Marker({ // Asignamos el marcador a la propiedad
        position: this.initialLocation,
        map: this.map,
      });
    }

    this.isMapInitialized = true;
  }

  private showUserLocation(repartidorId: string): void {
    if (!this.isMapInitialized) {
      console.error('El mapa no está inicializado.');
      return;
    }

    // Suscripción para obtener el usuario
    this.userLocationSubscription = this.userService.getUserById(repartidorId).subscribe(user => {
      if (user && user.latitude && user.longitude) {
        const repartidorLocation: google.maps.LatLngLiteral = {
          lat: user.latitude,
          lng: user.longitude,
        };
        this.updateMarker(repartidorLocation); // Mostramos la ubicación del repartidor en el mapa
      } else {
        console.error('No se encontró el repartidor o la ubicación.');
      }
    });
  }

  private updateMarker(location: google.maps.LatLngLiteral): void {
    if (this.isMapInitialized) {
      // Actualizamos la ubicación del marcador
      this.marker.setPosition(location);
      this.map.setCenter(location);
    }
  }

  private startLocationPolling(): void {
    setInterval(() => {
      const repartidorId = '2'; // Usamos un ID de repartidor de ejemplo
      this.showUserLocation(repartidorId);
    }, 5000); // Actualiza la ubicación cada 5 segundos
  }

  ngOnDestroy(): void {
    if (this.userLocationSubscription) {
      this.userLocationSubscription.unsubscribe();
    }
  }

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