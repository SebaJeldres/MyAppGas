import { Compania } from "./compania";

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