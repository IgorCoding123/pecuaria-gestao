import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioService, ResumoGeral } from '../../services/relatorio.service';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.css'
})
export class RelatoriosComponent implements OnInit {
  resumo: ResumoGeral | null = null;
  dataAtual = new Date();

  constructor(private relatorioService: RelatorioService) { }

  ngOnInit(): void {
    this.relatorioService.getResumoGeral().subscribe(data => {
      this.resumo = data;
    });
  }

  objectEntries(obj: any): [string, any][] {
    if (!obj) return [];
    return Object.entries(obj);
  }

  imprimirRelatorio(): void {
    window.print();
  }
}
