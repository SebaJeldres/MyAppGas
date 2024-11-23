import { Component, OnInit } from '@angular/core';
import { SolicitudService } from 'src/app/api/services/solicitud/solicitud.service';
import { solicitud } from 'src/app/models/solicitud';

@Component({
  selector: 'app-historial-pedidos',
  templateUrl: './historial-pedidos.page.html',
  styleUrls: ['./historial-pedidos.page.scss'],
})
export class HistorialPedidosPage implements OnInit {

  solicitudesCanceladas: solicitud[] = [];

  constructor(private SolicitudService: SolicitudService) { }

  ngOnInit() {
    this.SolicitudService.obtener_solicitud().subscribe((response: any) => {
      // Filtrar solicitudes con estado 'cancelado'
      this.solicitudesCanceladas = response.body.filter((solicitud: solicitud) => solicitud.estado_soli === 'Cancelado');
    });
  }

}

