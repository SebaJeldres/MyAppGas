import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  baseUrl = environment.api_url;

  constructor(private http: HttpClient) { }

  // Generar encabezados para las solicitudes
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'apiKey': environment.apiKeySupabase,
      'Authorization': `Bearer ${environment.apiKeySupabase}`
    });
  }

  // Manejar errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error ocurrido:', error);
    return throwError(() => error);
  }

  // Método GET con soporte para parámetros opcionales
  get<T>(path: string, params?: any): Observable<HttpResponse<T>> {
    return this.http.get<T>(`${this.baseUrl}${path}`, {
      headers: this.getHeaders(),
      observe: 'response',
      params // Aquí usamos los parámetros de consulta
    }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud GET: ', error);
        return throwError(() => error);
      })
    );
  }
  

  // Método POST
  post<T>(path: string, data: any): Observable<HttpResponse<T>> {
    return this.http.post<T>(
      `${this.baseUrl}${path}`,
      data,
      {
        headers: this.getHeaders(),
        observe: 'response'
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  // Método PATCH
  patch<T>(path: string, data: any): Observable<HttpResponse<T>> {
    return this.http.patch<T>(`${this.baseUrl}${path}`, data, {
      headers: this.getHeaders(),
      observe: 'response'
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Método DELETE
  delete<T>(path: string): Observable<HttpResponse<T>> {
    return this.http.delete<T>(`${this.baseUrl}${path}`, {
      headers: this.getHeaders(),
      observe: 'response',
    }).pipe(catchError(this.handleError));
  }
}
