import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from './animal.service';
import { environment } from '../../environments/environment';

export interface RegistroSaude {
  id?: number;
  tipo: string;
  descricao: string;
  dataAplicacao: string;
  proximaDose?: string;
  veterinario?: string;
  observacao?: string;
  animal?: Animal;
}

@Injectable({
  providedIn: 'root'
})
export class SaudeService {
  private apiUrl = `${environment.apiUrl}/saude`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<RegistroSaude[]> {
    return this.http.get<RegistroSaude[]>(this.apiUrl);
  }

  getById(id: number): Observable<RegistroSaude> {
    return this.http.get<RegistroSaude>(`${this.apiUrl}/${id}`);
  }

  create(registro: RegistroSaude): Observable<RegistroSaude> {
    return this.http.post<RegistroSaude>(this.apiUrl, registro);
  }

  update(id: number, registro: RegistroSaude): Observable<RegistroSaude> {
    return this.http.put<RegistroSaude>(`${this.apiUrl}/${id}`, registro);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
