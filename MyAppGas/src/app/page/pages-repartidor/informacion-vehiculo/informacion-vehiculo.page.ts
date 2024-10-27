import { Component, ViewChild, OnInit } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { vehiculo } from 'src/app/models/vehiculo';
import { VehiculoService } from 'src/app/api/services/vehiculo/vehiculo.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { firstValueFrom } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { crearVehiculo } from 'src/app/models/crearVehiculo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion-vehiculo',
  templateUrl: './informacion-vehiculo.page.html',
  styleUrls: ['./informacion-vehiculo.page.scss'],
})
export class InformacionVehiculoPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  vehiculos: vehiculo[] = [];
  idConductor: string | null = null;

  nuevo_vehiculo: crearVehiculo = {
    patente: "",
    id_conductor: "",
    marca: "",
    modelo: "",
  };

  constructor(private vehiculoService: VehiculoService, private router: Router) {}

  ngOnInit() {
    // Obtén el ID del conductor desde el estado de navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.idConductor = navigation.extras.state['id'] || null;
      console.log('ID del conductor recibido:', this.idConductor); // Para verificar que el ID se esté recibiendo correctamente
    }

    this.obtenerVehiculos(); // Llama al método al iniciar
  }

  async obtenerVehiculos() {
    try {
      const response: HttpResponse<vehiculo[]> = await firstValueFrom(this.vehiculoService.obtener_vehiculos());
      const listaCompleta = response.body || [];

      console.log('Lista completa de vehículos:', listaCompleta); // Para depuración
      console.log('ID del conductor utilizado para filtrar:', this.idConductor); // Para depuración

      // Filtra los vehículos por el id del conductor solo si `idConductor` tiene un valor
      if (this.idConductor) {
        this.vehiculos = listaCompleta.filter(vehiculo => vehiculo.id_conductor === this.idConductor);
        console.log('Vehículos filtrados:', this.vehiculos); // Para depuración
      } else {
        this.vehiculos = listaCompleta; // Si no hay ID, muestra todos
      }
    } catch (error) {
      console.log('Error al obtener vehiculos: ', error);
    }
  }

  cancelar() {
    this.modal.dismiss(null, 'cancel');
  }

  async agregarVehiculo(nuevoVehiculo: crearVehiculo) {
    const response: HttpResponse<vehiculo> = await firstValueFrom(this.vehiculoService.agregarNuevoVehiculo(nuevoVehiculo));
    this.obtenerVehiculos(); // Actualiza la lista de vehículos
    this.modal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log('Vehículo agregado con éxito');
    }
  }
}






