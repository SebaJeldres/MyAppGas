export interface vehiculo{
    patente: string;
    conductor: string;
    marca: string;
    modelo: string;
    estado: 'Entrega' | 'Camino' | 'Disponible' | 'Fuera de servicio';
}