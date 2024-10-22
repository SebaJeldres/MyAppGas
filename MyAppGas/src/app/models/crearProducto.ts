export interface CrearProducto {
  sku: string;
  nombre: string; 
 compania: string;
  tipo: string;
  kilos: number | null; 
  precio: number | null;
  stock: number | null;
}

