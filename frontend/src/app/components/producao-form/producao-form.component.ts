import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProducaoService } from '../../services/producao.service';
import { Animal, AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-producao-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './producao-form.component.html',
  styleUrl: './producao-form.component.css'
})
export class ProducaoFormComponent implements OnInit {
  producaoForm: FormGroup;
  isEdit = false;
  producaoId?: number;
  animais: Animal[] = [];

  constructor(
    private fb: FormBuilder,
    private producaoService: ProducaoService,
    private animalService: AnimalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.producaoForm = this.fb.group({
      tipo: ['Leite', Validators.required],
      quantidade: [0, [Validators.required, Validators.min(0.1)]],
      unidadeMedida: ['Litros', Validators.required],
      data: [new Date().toISOString().substring(0, 10), Validators.required],
      observacao: [''],
      animal: [null]
    });
  }

  ngOnInit(): void {
    this.loadAnimais();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.producaoId = +id;
      this.producaoService.getById(this.producaoId).subscribe(p => {
        this.producaoForm.patchValue(p);
      });
    }
  }

  loadAnimais(): void {
    this.animalService.getAll().subscribe(data => {
      this.animais = data;
    });
  }

  onSubmit(): void {
    if (this.producaoForm.valid) {
      const data = this.producaoForm.value;
      if (this.isEdit && this.producaoId) {
        this.producaoService.update(this.producaoId, data).subscribe(() => {
          this.router.navigate(['/producao']);
        });
      } else {
        this.producaoService.create(data).subscribe(() => {
          this.router.navigate(['/producao']);
        });
      }
    }
  }
}
