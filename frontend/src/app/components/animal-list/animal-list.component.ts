import { Component, OnInit } from '@angular/core';
import { Animal, AnimalService } from '../../services/animal.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.css'
})
export class AnimalListComponent implements OnInit {
  animais: Animal[] = [];

  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
    this.loadAnimais();
  }

  loadAnimais(): void {
    this.animalService.getAll().subscribe(data => {
      this.animais = data;
    });
  }

  deleteAnimal(id: number): void {
    if (confirm('Tem certeza que deseja excluir este animal?')) {
      this.animalService.delete(id).subscribe(() => {
        this.loadAnimais();
      });
    }
  }
}
