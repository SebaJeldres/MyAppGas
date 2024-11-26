import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { PedidoService } from 'src/app/api/services/pedido/pedido.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
})
export class DetallePedidoPage implements OnInit {
  pedidoForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private pedidoService: PedidoService,
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
      const pedido = navigation.extras.state['pedido'];
      if (pedido) {
        this.pedidoForm.patchValue({
          id: pedido.id,
          monto_total: pedido.monto_total,
          nombre_usuario: pedido.nombre_usuario,
          direccion_entrega: pedido.direccion_entrega,
          metodo_pago: pedido.metodo_pago,
          numtelefonico: pedido.numtelefonico,
          hora_ini: pedido.hora_ini,
          detalle_pedido: pedido.detalle_pedido,
          nombre_repartidor: pedido.nombre_repartidor || '', // Campo opcional
          patente: pedido.patente || '', // Campo opcional
        });
      }
    }
  }

  actualizarPedido() {
    const pedidoId = this.pedidoForm.get('id')?.value;
    const nuevaPatente = this.pedidoForm.get('patente')?.value;
  
    if (pedidoId && nuevaPatente) {
      this.pedidoService
        .actualizarPedido(pedidoId, { patente: nuevaPatente, estado: 'En Camino' })
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
