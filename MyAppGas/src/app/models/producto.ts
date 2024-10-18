import { Compania } from "./compania";

export interface producto{
    id: number;
    sku: number;
    nombre: string;
    compania: Compania | null;
    tipo: string;
    kilos: number;
    precio: string;
    stock: number;

}