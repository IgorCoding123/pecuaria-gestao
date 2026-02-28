import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FinanceiroService } from '../../services/financeiro.service';

@Component({
  selector: 'app-transacao-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './transacao-form.component.html',
  styleUrl: './transacao-form.component.css'
})
export class TransacaoFormComponent implements OnInit {
  transacaoForm: FormGroup;
  isEdit = false;
  transacaoId?: number;

  constructor(
    private fb: FormBuilder,
    private service: FinanceiroService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.transacaoForm = this.fb.group({
      descricao: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(0.01)]],
      tipo: ['DESPESA', Validators.required],
      categoria: ['Alimentação', Validators.required],
      data: [new Date().toISOString().substring(0, 10), Validators.required],
      observacao: ['']
    });

    // Reset categoria when tipo changes to ensure valid selection
    this.transacaoForm.get('tipo')?.valueChanges.subscribe(tipo => {
      if (tipo === 'RECEITA') {
        this.transacaoForm.get('categoria')?.setValue('Venda de Animais');
      } else {
        this.transacaoForm.get('categoria')?.setValue('Alimentação');
      }
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.transacaoId = +id;
      this.service.getById(this.transacaoId).subscribe(t => {
        this.transacaoForm.patchValue(t);
      });
    }
  }

  onSubmit(): void {
    if (this.transacaoForm.valid) {
      const data = this.transacaoForm.value;
      if (this.isEdit && this.transacaoId) {
        this.service.update(this.transacaoId, data).subscribe(() => {
          this.router.navigate(['/financeiro']);
        });
      } else {
        this.service.create(data).subscribe(() => {
          this.router.navigate(['/financeiro']);
        });
      }
    }
  }
}
