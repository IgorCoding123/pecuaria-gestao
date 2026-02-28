import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Transacao {
  id?: number;
  descricao: string;
  valor: number;
  tipo: 'RECEITA' | 'DESPESA';
  categoria: string;
  data: string;
  observacao?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {
  private apiUrl = `${environment.apiUrl}/transacoes`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(this.apiUrl);
  }

  getById(id: number): Observable<Transacao> {
    return this.http.get<Transacao>(`${this.apiUrl}/${id}`);
  }

  create(transacao: Transacao): Observable<Transacao> {
    return this.http.post<Transacao>(this.apiUrl, transacao);
  }

  update(id: number, transacao: Transacao): Observable<Transacao> {
    return this.http.put<Transacao>(`${this.apiUrl}/${id}`, transacao);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
