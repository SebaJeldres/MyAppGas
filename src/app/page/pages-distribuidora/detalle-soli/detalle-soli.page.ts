import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SolicitudService } from 'src/app/api/services/solicitud/solicitud.service';
import { PedidoService } from 'src/app/api/services/pedido/pedido.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-soli',
  templateUrl: './detalle-soli.page.html',
  styleUrls: ['./detalle-soli.page.scss'],
})
export class DetalleSoliPage implements OnInit, AfterViewInit {
  solicitudForm: FormGroup;
  rol: string | null = null;
  private map!: google.maps.Map;
  private marker!: google.maps.Marker;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private solicitudService: SolicitudService,
    private pedidoService: PedidoService,
    private alertController: AlertController
  ) {
    this.solicitudForm = this.formBuilder.group({
      id: [''],
      monto_total: [''],
      nombre_usuario: [''],
      nombre_repartidor: [''],
      distribuidora: [''],
      patente: [''],
      direccion_entrega: [''],
      metodo_pago: [''],
      hora_ini: [''],
      numtelefonico: [''],
      detalle_solicitud: [],
      latitude: [''],
      longitude: [''],
      latitude_r: [''],
      longitude_r: [''],
    });
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras?.state) {
      this.rol = navigation.extras.state['rol'];
      const solicitud = navigation.extras.state['solicitud'];
      if (solicitud) {
        this.solicitudForm.patchValue({
          id: solicitud.id,
          monto_total: solicitud.monto_total,
          nombre_usuario: solicitud.nombre_usuario,
          nombre_repartidor: solicitud.nombre_repartidor || 'Sin asignar',
          distribuidora: solicitud.distribuidora || 'No asignada',
          patente: solicitud.patente || 'No registrada',
          direccion_entrega: solicitud.direccion,
          metodo_pago: solicitud.metodo_pago,
          hora_ini: solicitud.hora_ini,
          numtelefonico: solicitud.numtelefonico,
          detalle_solicitud: solicitud.detalle_pedido,
          latitude: solicitud.latitude,
          longitude: solicitud.longitude,
          latitude_r: null,
          longitude_r: null,
        });
      }
    }
  }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    const latitude = parseFloat(this.solicitudForm.get('latitude')?.value) || 0;
    const longitude = parseFloat(this.solicitudForm.get('longitude')?.value) || 0;

    const mapOptions: google.maps.MapOptions = {
      center: { lat: latitude, lng: longitude },
      zoom: 15,
    };

    const mapElement = document.getElementById('map') as HTMLElement;
    this.map = new google.maps.Map(mapElement, mapOptions);

    this.marker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: this.map,
      title: 'Ubicación de entrega',
    });
  }

  async crearPedido() {
    if (!this.solicitudForm.valid) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos requeridos antes de continuar.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const nuevoPedido = {
      nombre_usuario: this.solicitudForm.get('nombre_usuario')?.value,
      nombre_repartidor: 'Sin asignar',
      distribuidora: 'Carlos_admin',
      patente: 'No registrada',
      monto_total: this.solicitudForm.get('monto_total')?.value,
      detalle_pedido: this.solicitudForm.get('detalle_solicitud')?.value,
      metodo_pago: this.solicitudForm.get('metodo_pago')?.value,
      direccion: this.solicitudForm.get('direccion_entrega')?.value,
      hora_ini: this.solicitudForm.get('hora_ini')?.value,
      num_telefonico: this.solicitudForm.get('numtelefonico')?.value,
      estado: 'Espera',
      latitude: this.solicitudForm.get('latitude')?.value,
      longitude: this.solicitudForm.get('longitude')?.value,
      latitude_r: 0,
      longitude_r: 0,
    };

    console.log('Enviando pedido:', nuevoPedido);

    this.pedidoService.crearPedido(nuevoPedido).subscribe({
      next: async () => {
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'El pedido fue creado correctamente.',
          buttons: ['OK'],
        });
        await alert.present();
        const solicitudId = this.solicitudForm.get('id')?.value;
        if (solicitudId) {
          await this.solicitudService.actualizarEstadoSolicitud(solicitudId, 'Aceptado').toPromise();
        }
      },
      error: async (error) => {
        console.error(error);
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Ocurrió un error al crear el pedido.',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }

  async CancelarSolicitud() {
    const solicitudId = this.solicitudForm.get('id')?.value;
    if (solicitudId) {
      this.solicitudService.actualizarEstadoSolicitud(solicitudId, 'Cancelado').subscribe({
        next: async () => {
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'La solicitud fue cancelada correctamente.',
            buttons: ['OK'],
          });
          await alert.present();
        },
        error: async (error) => {
          console.error(error);
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Ocurrió un error al cancelar la solicitud.',
            buttons: ['OK'],
          });
          await alert.present();
        },
      });
    }
  }
}
