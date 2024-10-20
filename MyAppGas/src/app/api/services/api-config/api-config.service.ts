import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  baseUrl = environment.api_url;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'apiKey': environment.apiKeySupabase,
      'Authorization': `Bearer ${environment.apiKeySupabase}`
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error ocurrido:', error);
    return throwError(() => error);
  }


  get<T>(path: string, params?: HttpParams): Observable<HttpResponse<T>> {
    return this.http.get<T>(`${this.baseUrl}${path}`, { headers: this.getHeaders(), observe: 'response', params })
    .pipe(
      catchError(this.handleError)
    );
  }

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
}
