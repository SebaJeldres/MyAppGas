export interface crearUser{
    id?: string;
    username: string;
    password: string;
    rol: string;
    nombre: string;
    apellido: string;
    correo: string;
    num_telefonico: string;
    direccion: string;
    latitude?: number; // Coordenada de latitud
  longitude?: number; // Coordenada de longitud

}