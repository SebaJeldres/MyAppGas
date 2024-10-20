import { Compania } from './compania';

export interface producto {
  id: number;
  sku: number;
  nombre: string;
  compania: Compania | null;
  tipo: string;
  kilos: number;
  precio: number;
  stock: number;
  cantidad?: number;
  deleted_at: Date;
}
