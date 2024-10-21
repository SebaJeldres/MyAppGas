import { Injectable } from "@angular/core";
import { Compania } from "src/app/models/compania";


@Injectable({
  providedIn: 'root'
})
export class CompaniasService {
  
  lista_de_companias: Compania[] = [
    {
        id: 1,
        nombre: "Lipigas"
    },
    {
        id: 2,
        nombre: "Gasco"
    },
    {
        id: 3,
        nombre: "Abastible"
    }
  ]

    constructor() { }

    public obtener_companias(): Compania[] {
        return this.lista_de_companias;
    }
}