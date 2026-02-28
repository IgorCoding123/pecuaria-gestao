import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from './animal.service';
import { environment } from '../../environments/environment';

export interface Producao {
  id?: number;
  tipo: string;
  quantidade: number;
  unidadeMedida: string;
  data: string;
  observacao?: string;
  animal?: Animal;
}

@Injectable({
  providedIn: 'root'
})
export class ProducaoService {
  private apiUrl = `${environment.apiUrl}/producoes`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Producao[]> {
    return this.http.get<Producao[]>(this.apiUrl);
  }

  getById(id: number): Observable<Producao> {
    return this.http.get<Producao>(`${this.apiUrl}/${id}`);
  }

  create(producao: Producao): Observable<Producao> {
    return this.http.post<Producao>(this.apiUrl, producao);
  }

  update(id: number, producao: Producao): Observable<Producao> {
    return this.http.put<Producao>(`${this.apiUrl}/${id}`, producao);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
