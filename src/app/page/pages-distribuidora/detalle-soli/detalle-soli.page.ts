import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    private formBuilder: FormBuilder
  ) {
    this.solicitudForm = this.formBuilder.group({
      id: [''],
      estado_soli: [''],
      monto_total: [''],
      nombre_usuario: [''],
      direccion_entrega: [''],
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
          direccion_entrega: solicitud.direccion_entrega,
        });
      }
    }
  }
}
