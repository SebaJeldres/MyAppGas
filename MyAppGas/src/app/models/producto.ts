import { Compania } from './compania';

export interface producto {
  id: number;
  sku: number; // Si deseas que sku pueda ser nulo, cambia esto a: sku: number | null;
  nombre: string;
  compania: Compania | null;
  tipo: string;
  kilos: number; // Si deseas que kilos pueda ser nulo, cambia esto a: kilos: number | null;
  precio: number; // Si deseas que precio pueda ser nulo, cambia esto a: precio: number | null;
  stock: number; // Si deseas que stock pueda ser nulo, cambia esto a: stock: number | null;
  cantidad?: number; // Esta propiedad es opcional
  deleted_at: Date;
}
