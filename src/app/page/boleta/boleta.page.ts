import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { PedidoService } from 'src/app/api/services/pedido/pedido.service';
import { Pedido } from 'src/app/models/pedido'; // Asegúrate de importar la interfaz o modelo

@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.page.html',
  styleUrls: ['./boleta.page.scss'],
})
export class BoletaPage implements OnInit {
  pedidoForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private pedidoService: PedidoService,
    private alertController: AlertController
  ) {
    // Inicializamos el formulario
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
          nombre_repartidor: pedido.nombre_repartidor,
          patente: pedido.patente,
        });
      }
    }
  }

  // Método para actualizar el estado del pedido a "Entregado"
  actualizarPedido1() {
    const pedidoId = this.pedidoForm.get('id')?.value;

    // Verificamos que el ID sea válido antes de intentar actualizar
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

    // Actualizamos solo el estado del pedido a "Entregado"
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

  // Método para actualizar el estado del pedido a "Cancelado"
  actualizarPedido2() {
    const pedidoId = this.pedidoForm.get('id')?.value;

    // Verificamos que el ID sea válido antes de intentar actualizar
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

    // Actualizamos solo el estado del pedido a "Cancelado"
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
