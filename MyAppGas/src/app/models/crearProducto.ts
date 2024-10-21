export interface CrearProducto {
  sku: string;
  nombre: string;
  compania: number | null; // Esta propiedad debe ser de tipo number o null
  tipo: string;
  kilos: number | null; // Asegúrate de que esto también sea numérico o null
  precio: number | null; // Lo mismo aquí
  stock: number | null; // Y aquí
}

