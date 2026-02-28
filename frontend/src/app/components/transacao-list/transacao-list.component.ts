import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FinanceiroService, Transacao } from '../../services/financeiro.service';

@Component({
  selector: 'app-transacao-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './transacao-list.component.html',
  styleUrl: './transacao-list.component.css'
})
export class TransacaoListComponent implements OnInit {
  transacoes: Transacao[] = [];
  totalReceitas = 0;
  totalDespesas = 0;
  saldo = 0;

  constructor(private service: FinanceiroService) { }

  ngOnInit(): void {
    this.loadTransacoes();
  }

  loadTransacoes(): void {
    this.service.getAll().subscribe(data => {
      this.transacoes = data;
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    this.totalReceitas = this.transacoes
      .filter(t => t.tipo === 'RECEITA')
      .reduce((sum, t) => sum + t.valor, 0);

    this.totalDespesas = this.transacoes
      .filter(t => t.tipo === 'DESPESA')
      .reduce((sum, t) => sum + t.valor, 0);

    this.saldo = this.totalReceitas - this.totalDespesas;
  }

  deleteTransacao(id: number): void {
    if (confirm('Deseja excluir esta transação?')) {
      this.service.delete(id).subscribe(() => {
        this.loadTransacoes();
      });
    }
  }
}
