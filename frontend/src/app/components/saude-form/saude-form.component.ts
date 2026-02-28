import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SaudeService } from '../../services/saude.service';
import { Animal, AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-saude-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './saude-form.component.html',
  styleUrl: './saude-form.component.css'
})
export class SaudeFormComponent implements OnInit {
  saudeForm: FormGroup;
  isEdit = false;
  registroId?: number;
  animais: Animal[] = [];

  constructor(
    private fb: FormBuilder,
    private saudeService: SaudeService,
    private animalService: AnimalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.saudeForm = this.fb.group({
      tipo: ['Vacina', Validators.required],
      descricao: ['', Validators.required],
      dataAplicacao: [new Date().toISOString().substring(0, 10), Validators.required],
      proximaDose: [''],
      veterinario: [''],
      observacao: [''],
      animal: [null]
    });
  }

  ngOnInit(): void {
    this.loadAnimais();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.registroId = +id;
      this.saudeService.getById(this.registroId).subscribe(r => {
        this.saudeForm.patchValue(r);
      });
    }
  }

  loadAnimais(): void {
    this.animalService.getAll().subscribe(data => {
      this.animais = data;
    });
  }

  onSubmit(): void {
    if (this.saudeForm.valid) {
      const data = this.saudeForm.value;
      if (this.isEdit && this.registroId) {
        this.saudeService.update(this.registroId, data).subscribe(() => {
          this.router.navigate(['/saude']);
        });
      } else {
        this.saudeService.create(data).subscribe(() => {
          this.router.navigate(['/saude']);
        });
      }
    }
  }
}
