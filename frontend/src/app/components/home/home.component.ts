import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  activeTab: 'login' | 'register' | 'verify' = 'login';
  errorMsg = '';
  successMsg = '';
  pendingEmail = '';

  // Login
  loginEmail = '';
  loginSenha = '';

  // Registro
  regNome = '';
  regEmail = '';
  regSenha = '';
  regSenhaConfirm = '';
  regNomeFazenda = '';

  // Verificação
  verifyCodigo = '';

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  onLogin(): void {
    this.errorMsg = '';
    if (!this.loginEmail || !this.loginSenha) {
      this.errorMsg = 'Preencha email e senha.';
      return;
    }
    this.authService.login({ email: this.loginEmail, senha: this.loginSenha }).subscribe({
      next: (res) => {
        this.router.navigate(['/animais']);
      },
      error: (err) => {
        if (err.error?.requerVerificacao) {
          this.pendingEmail = err.error.email || this.loginEmail;
          this.activeTab = 'verify';
          this.errorMsg = '';
          this.successMsg = 'Sua conta precisa ser verificada. Confira seu email.';
        } else {
          this.errorMsg = err.error?.erro || 'Erro ao fazer login.';
        }
      }
    });
  }

  onRegister(): void {
    this.errorMsg = '';
    this.successMsg = '';
    if (!this.regNome || !this.regEmail || !this.regSenha) {
      this.errorMsg = 'Preencha todos os campos obrigatórios.';
      return;
    }
    if (this.regSenha !== this.regSenhaConfirm) {
      this.errorMsg = 'As senhas não coincidem.';
      return;
    }
    if (this.regSenha.length < 6) {
      this.errorMsg = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }
    this.authService.registrar({
      nome: this.regNome,
      email: this.regEmail,
      senha: this.regSenha,
      nomeFazenda: this.regNomeFazenda
    }).subscribe({
      next: (res) => {
        this.pendingEmail = this.regEmail;
        this.activeTab = 'verify';
        this.errorMsg = '';
        this.successMsg = 'Cadastro realizado! Verifique seu email e digite o código de 6 dígitos.';
      },
      error: (err) => {
        this.errorMsg = err.error?.erro || 'Erro ao cadastrar.';
      }
    });
  }

  onVerify(): void {
    this.errorMsg = '';
    if (!this.verifyCodigo || this.verifyCodigo.length !== 6) {
      this.errorMsg = 'Digite o código de 6 dígitos enviado para seu email.';
      return;
    }
    this.authService.verificar({ email: this.pendingEmail, codigo: this.verifyCodigo }).subscribe({
      next: () => {
        this.router.navigate(['/animais']);
      },
      error: (err) => {
        this.errorMsg = err.error?.erro || 'Código inválido.';
      }
    });
  }

  onResendCode(): void {
    this.errorMsg = '';
    this.authService.reenviarCodigo(this.pendingEmail).subscribe({
      next: () => {
        this.successMsg = 'Novo código enviado para ' + this.pendingEmail;
      },
      error: () => {
        this.errorMsg = 'Erro ao reenviar código.';
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
