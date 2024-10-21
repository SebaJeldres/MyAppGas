import { Injectable } from "@angular/core";
import { Compania } from "src/app/models/compania";
import { Observable, of } from "rxjs"; // Asegúrate de importar `of`

@Injectable({
  providedIn: 'root'
})
export class CompaniasService {
  
  lista_de_companias: Compania[] = [
    { id: 1, nombre: "Lipigas" },
    { id: 2, nombre: "Gasco" },
    { id: 3, nombre: "Abastible" }
  ];

  constructor() {}

  public obtener_companias(): Observable<Compania[]> {
    return of(this.lista_de_companias); // Devuelve un Observable
  }
}
