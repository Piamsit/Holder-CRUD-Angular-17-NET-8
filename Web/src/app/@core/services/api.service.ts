import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, {
      params,
    });
  }

  put(path: string, body: object = {}): Observable<any> {
    return this.http.put(`${environment.apiUrl}${path}`, body, httpOptions);
  }

  post(path: string, body: object = {}): Observable<any> {
    return this.http.post(`${environment.apiUrl}${path}`, body, httpOptions);
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${path}`, httpOptions);
  }
}
