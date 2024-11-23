import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SolicitudService } from 'src/app/api/services/solicitud/solicitud.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-soli',
  templateUrl: './detalle-soli.page.html',
  styleUrls: ['./detalle-soli.page.scss'],
})
export class DetalleSoliPage implements OnInit {
  solicitudForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private solicitudService: SolicitudService,
    private alertController: AlertController
  ) {
    this.solicitudForm = this.formBuilder.group({
      id: [''],
      estado_soli: [''],
      monto_total: [''],
      nombre_usuario: [''],
      direccion_entrega: [''],
      metodo_pago: [''],
      hora_ini: [''],
      numtelefonico: [''],
      detalle_solicitud:[],
    });
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const solicitud = navigation.extras.state['solicitud'];
      if (solicitud) {
        this.solicitudForm.patchValue({
          id: solicitud.id,
          estado_soli: solicitud.estado_soli,
          monto_total: solicitud.monto_total,
          nombre_usuario: solicitud.nombre_usuario,
          direccion_entrega: solicitud.direccion,
          metodo_pago: solicitud.metodo_pago,
          hora_ini: solicitud.hora_ini,
          numtelefonico: solicitud.numtelefonico,
          detalle_solicitud: solicitud.detalle_pedido,
        });
      }
    }
  }

  CancelarSolicitud() {
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
