export interface CrearProducto {
  sku: string;
  nombre: string;
  compania: number | null;
  tipo: string;
  kilos: number | null;
  precio: number | null;
  stock: number | null;
}
