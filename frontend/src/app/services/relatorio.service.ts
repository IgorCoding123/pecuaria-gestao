import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ResumoGeral {
  totalAnimais: number;
  animaisPorTipo: { [key: string]: number };
  animaisPorFinalidade: { [key: string]: number };
  totalQuantidadeAnimais: number;
  totalProducoes: number;
  producaoPorTipo: { [key: string]: number };
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  despesasPorCategoria: { [key: string]: number };
  receitasPorCategoria: { [key: string]: number };
  totalRegistrosSaude: number;
  saudePorTipo: { [key: string]: number };
  animais: any[];
  producoes: any[];
  transacoes: any[];
  registrosSaude: any[];
}

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  private apiUrl = `${environment.apiUrl}/relatorios`;

  constructor(private http: HttpClient) { }

  getResumoGeral(): Observable<ResumoGeral> {
    return this.http.get<ResumoGeral>(`${this.apiUrl}/resumo`);
  }
}
