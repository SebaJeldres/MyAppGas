import { Component, OnInit } from '@angular/core';
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
export class DetalleSoliPage implements OnInit {
  solicitudForm: FormGroup;
  rol: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private solicitudService: SolicitudService,
    private pedidoService: PedidoService, // Servicio de pedidos
    private alertController: AlertController
  ) {
    // Definir el formulario
    this.solicitudForm = this.formBuilder.group({
      id: [''],
      monto_total: [''],
      nombre_usuario: [''],
      nombre_repartidor:[''],
      distribuidora:[''],
      patente:[''],
      direccion_entrega: [''],
      metodo_pago: [''],
      hora_ini: [''],
      numtelefonico: [''],
      detalle_solicitud: [],
      latitude: [''],
      longitude: [''],
      latitude_r: [''],
      longitude_r:['']

    });
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();

    // Verificar si el rol está presente en la navegación
    if (navigation?.extras?.state) {
      this.rol = navigation.extras.state['rol'];
      console.log('Rol recibido:', this.rol);

      // Obtener la solicitud pasada como estado de la navegación
      const solicitud = navigation.extras.state['solicitud'];
      if (solicitud) {
        // Rellenar el formulario con los datos de la solicitud
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

  // Crear pedido cuando el usuario hace click en "Aceptar"
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

    // Crear el objeto del nuevo pedido, omitiendo el campo 'id'
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
      longitude:this.solicitudForm.get('longitude')?.value,
      latitude_r: 0,
      longitude_r: 0
    };

    console.log('Enviando pedido:', nuevoPedido);

    try {
      // Usar subscribe() para enviar el pedido al backend
      this.pedidoService.crearPedido(nuevoPedido).subscribe({
        next: async (pedido) => {
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'El pedido fue creado correctamente.',
            buttons: ['OK'],
          });
          await alert.present();

          // Actualizar el estado de la solicitud a "aceptado"
          const solicitudId = this.solicitudForm.get('id')?.value;
          if (solicitudId) {
            await this.solicitudService.actualizarEstadoSolicitud(solicitudId, 'Aceptado').toPromise();
          }
        },
        error: async (error) => {
          console.error('Error al crear el pedido:', error);

          const mensajeError = error?.error?.message || error?.message || 'Ocurrió un error al crear el pedido. Intente nuevamente.';

          const alert = await this.alertController.create({
            header: 'Error',
            message: mensajeError,
            buttons: ['OK'],
          });
          await alert.present();
        },
      });
    } catch (error) {
      console.error('Error al crear el pedido:', error);

      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ocurrió un error al procesar la solicitud. Intente nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  // Rechazar la solicitud
  async CancelarSolicitud() {
    const solicitudId = this.solicitudForm.get('id')?.value; 
    if (solicitudId) {
      this.solicitudService
        .actualizarEstadoSolicitud(solicitudId, 'Cancelado') 
        .subscribe({
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
