export interface solicitud{
    id?: string;
    nombre_usuario?:string;
    direccion:string;
    numtelefonico:string;
    detalle_pedido: string[];
    metodo_pago:number;
    hora_ini: Date;
    estado_soli: string;
    monto_total: number;

}