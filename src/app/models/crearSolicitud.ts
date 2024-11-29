export interface crearSolicitud {
    id_solicitud: number;
    id_usario: Number ;
    nombre_usuario?:string;
    direccion:string;
    numtelefonico:string;
    detalle_pedido: string[];
    metodo_pago:number;
    hora_ini: Date;
    estado_soli: string;
    monto_total: number;
    latitude?: number; // Coordenada de latitud
    longitude?: number;
}