export interface user{
    id?: string;
    username: string;
    password: string;
    rol: string;
    Nombre: string;
    apellido: string;
    Correo: string;
    NumTelefonico: string;
    Direccion: string;
    latitude?: number; // Coordenada de latitud
    longitude?: number; // Coordenada de longitud

}