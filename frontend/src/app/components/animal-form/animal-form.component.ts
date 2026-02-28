import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animal-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './animal-form.component.html',
  styleUrl: './animal-form.component.css'
})
export class AnimalFormComponent implements OnInit {
  animalForm: FormGroup;
  isEdit = false;
  animalId?: number;

  constructor(
    private fb: FormBuilder,
    private animalService: AnimalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.animalForm = this.fb.group({
      nome: ['', Validators.required],
      tipo: ['Boi', Validators.required],
      idade: ['Adulto', Validators.required],
      finalidade: ['Corte', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      observacao: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.animalId = +id;
      this.animalService.getById(this.animalId).subscribe(animal => {
        this.animalForm.patchValue(animal);
      });
    }
  }

  onSubmit(): void {
    if (this.animalForm.valid) {
      const animalData = this.animalForm.value;
      if (this.isEdit && this.animalId) {
        this.animalService.update(this.animalId, animalData).subscribe(() => {
          this.router.navigate(['/animais']);
        });
      } else {
        this.animalService.create(animalData).subscribe(() => {
          this.router.navigate(['/animais']);
        });
      }
    }
  }
}
