import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { PedidoService } from 'src/app/api/services/pedido/pedido.service';
import { UserService } from 'src/app/api/services/user/user.service';
import { BuscarUsuarioService } from 'src/app/api/services/buscar_usuario/buscar-usuario.service'; // Importar servicio BuscarUsuario
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

  private initialLocation: google.maps.LatLngLiteral = { lat: -33.4691, lng: -71.5771 }; // Default (Viña del Mar)
  private driverLocation: google.maps.LatLngLiteral = { lat: 0, lng: 0 }; // Ubicación inicial del repartidor

  // Definir el mapa y los marcadores como propiedades de la clase
  private map!: google.maps.Map;
  private deliveryMarker!: google.maps.Marker; // Marcador para la entrega
  private driverMarker!: google.maps.Marker; // Marcador para el repartidor

  // Variables de usuario
  id: string | null = null;
  username: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private pedidoService: PedidoService,
    private userService: UserService,
    private alertController: AlertController,
    private buscarUsuarioService: BuscarUsuarioService // Inyectar servicio para obtener usuario
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
      longitude:[''],
      latitude_r: [''],
      longitude_r:['']
    });
  }

  ngOnInit() {
    // Obtener el usuario actual desde el servicio 'BuscarUsuarioService'
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.rol = navigation.extras.state['rol'];
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
          latitude: pedido.latitude,
          longitude: pedido.longitude,
          latitude_r: pedido.latitude_r,
          longitude_r: pedido.longitude_r
        });

        console.log('Rol recibido en la página:', this.rol);
        console.log('ID al navegar:', this.id);

        // Actualizamos la ubicación inicial usando latitud y longitud del pedido
        const latitud = pedido.latitude; // Coordenada de la entrega
        const longitud = pedido.longitude; // Coordenada de la entrega
        if (latitud && longitud) {
          this.initialLocation = { lat: latitud, lng: longitud };
        } else {
          console.error('Las coordenadas del punto de entrega no están disponibles.');
        }

        // Inicializar la ubicación del repartidor
        const latitudRepartidor = pedido.latitude_r; // Coordenada del repartidor
        const longitudRepartidor = pedido.longitude_r; // Coordenada del repartidor
        if (latitudRepartidor && longitudRepartidor) {
          this.driverLocation = { lat: latitudRepartidor, lng: longitudRepartidor };
        } else {
          console.error('Las coordenadas del repartidor no están disponibles.');
        }
      }
    }
  }

  ngAfterViewInit(): void {
    this.initMap(); // Inicializamos el mapa cuando el componente está listo
  }

  private initMap(): void {
    console.log('Inicializando mapa con coordenadas:', this.initialLocation);

    const mapOptions: google.maps.MapOptions = {
      center: this.initialLocation,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    const mapElement = document.getElementById('map') as HTMLElement;
    if (mapElement) {
      this.map = new google.maps.Map(mapElement, mapOptions);
    }

    // Marcador para el punto de entrega
    if (this.initialLocation.lat && this.initialLocation.lng) {
      this.deliveryMarker = new google.maps.Marker({
        position: this.initialLocation,
        map: this.map,
        title: 'Punto de Entrega',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        },
      });
    } else {
      console.error('Las coordenadas del punto de entrega no son válidas.');
    }

    // Marcador para el repartidor
    if (this.driverLocation.lat && this.driverLocation.lng) {
      this.driverMarker = new google.maps.Marker({
        position: this.driverLocation,
        map: this.map,
        title: 'Repartidor',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        },
      });
    } else {
      console.error('Las coordenadas del repartidor no son válidas.');
    }

    this.isMapInitialized = true;
  }

  // Método para actualizar la posición del repartidor en tiempo real
  actualizarUbicacionRepartidor() {
    // Aquí deberías obtener las nuevas coordenadas del repartidor desde tu backend o servicio
    // Ejemplo de actualización:
    const newLat = parseFloat(this.pedidoForm.get('latitude_r')?.value || '0');
    const newLng = parseFloat(this.pedidoForm.get('longitude_r')?.value || '0');

    // Si las coordenadas son válidas, actualiza el marcador
    if (newLat && newLng) {
      const newLocation = { lat: newLat, lng: newLng };
      this.driverMarker.setPosition(newLocation); // Actualiza la posición del repartidor en el mapa
      this.driverLocation = newLocation; // Actualiza la ubicación interna del repartidor
    }
  }

  ngOnDestroy(): void {
    // Limpiar si es necesario
  }

  // Métodos para actualizar el estado del pedido
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
