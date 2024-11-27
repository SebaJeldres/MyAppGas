export interface CrearProducto {
  id?: string;
  sku: string;
  nombre: string; 
  tipo: string;
  kilos: number | null; 
  precio: number | null;
  stock: number | null;
}

