import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SaudeService, RegistroSaude } from '../../services/saude.service';

@Component({
  selector: 'app-saude-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './saude-list.component.html',
  styleUrl: './saude-list.component.css'
})
export class SaudeListComponent implements OnInit {
  registros: RegistroSaude[] = [];
  alertas: RegistroSaude[] = [];

  constructor(private service: SaudeService) { }

  ngOnInit(): void {
    this.loadRegistros();
  }

  loadRegistros(): void {
    this.service.getAll().subscribe(data => {
      this.registros = data;
      this.checkAlertas();
    });
  }

  checkAlertas(): void {
    const hoje = new Date();
    const em30dias = new Date();
    em30dias.setDate(hoje.getDate() + 30);

    this.alertas = this.registros.filter(r => {
      if (!r.proximaDose) return false;
      const proxima = new Date(r.proximaDose);
      return proxima >= hoje && proxima <= em30dias;
    });
  }

  deleteRegistro(id: number): void {
    if (confirm('Deseja excluir este registro de saúde?')) {
      this.service.delete(id).subscribe(() => {
        this.loadRegistros();
      });
    }
  }
}
