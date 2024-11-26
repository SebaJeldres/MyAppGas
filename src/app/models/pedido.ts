export interface Pedido {
    
    id?: string;
    nombre_usuario: string;
    nombre_repartidor: string;
    distribuidora: string;
    patente: string;
    monto_total: number;
    detalle_pedido: string[]; // Se permite agregar varios detalles al pedido
    metodo_pago: string;
    direccion: string;
    num_telefonico: string;
    estado: string; // Estado con las opciones específicas
  }
  