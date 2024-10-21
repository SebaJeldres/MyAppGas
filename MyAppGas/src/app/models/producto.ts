import { Compania } from './compania';

<<<<<<< HEAD
export interface producto{
    id: number;
    sku: number | null;
    nombre: string;
    compania: Compania | null;
    tipo: string;
    kilos: number | null;
    precio: number | null;
    stock: number | null;
    deleted_at: Date;
}
=======
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
>>>>>>> 482c7b5bb07bf1fa034f87281cde0fdb21406caf
