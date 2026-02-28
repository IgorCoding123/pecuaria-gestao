import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { AnimalFormComponent } from './components/animal-form/animal-form.component';
import { ProducaoListComponent } from './components/producao-list/producao-list.component';
import { ProducaoFormComponent } from './components/producao-form/producao-form.component';
import { TransacaoListComponent } from './components/transacao-list/transacao-list.component';
import { TransacaoFormComponent } from './components/transacao-form/transacao-form.component';
import { SaudeListComponent } from './components/saude-list/saude-list.component';
import { SaudeFormComponent } from './components/saude-form/saude-form.component';
import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'animais', component: AnimalListComponent, canActivate: [authGuard] },
  { path: 'animal-form', component: AnimalFormComponent, canActivate: [authGuard] },
  { path: 'animal-form/:id', component: AnimalFormComponent, canActivate: [authGuard] },
  { path: 'producao', component: ProducaoListComponent, canActivate: [authGuard] },
  { path: 'producao-form', component: ProducaoFormComponent, canActivate: [authGuard] },
  { path: 'producao-form/:id', component: ProducaoFormComponent, canActivate: [authGuard] },
  { path: 'financeiro', component: TransacaoListComponent, canActivate: [authGuard] },
  { path: 'transacao-form', component: TransacaoFormComponent, canActivate: [authGuard] },
  { path: 'transacao-form/:id', component: TransacaoFormComponent, canActivate: [authGuard] },
  { path: 'saude', component: SaudeListComponent, canActivate: [authGuard] },
  { path: 'saude-form', component: SaudeFormComponent, canActivate: [authGuard] },
  { path: 'saude-form/:id', component: SaudeFormComponent, canActivate: [authGuard] },
  { path: 'relatorios', component: RelatoriosComponent, canActivate: [authGuard] },
];
