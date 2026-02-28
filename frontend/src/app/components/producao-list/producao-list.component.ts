import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Producao, ProducaoService } from '../../services/producao.service';

@Component({
  selector: 'app-producao-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './producao-list.component.html',
  styleUrl: './producao-list.component.css'
})
export class ProducaoListComponent implements OnInit {
  producoes: Producao[] = [];

  constructor(private service: ProducaoService) { }

  ngOnInit(): void {
    this.loadProducoes();
  }

  loadProducoes(): void {
    this.service.getAll().subscribe(data => {
      this.producoes = data;
    });
  }

  deleteProducao(id: number): void {
    if (confirm('Tem certeza que deseja excluir este registro de produção?')) {
      this.service.delete(id).subscribe(() => {
        this.loadProducoes();
      });
    }
  }
}
