# 🐮 Gestão Rural - Sistema de Gestão de Pecuária Familiar

![Status](https://img.shields.io/badge/Status-Online-brightgreen)
![Tech](https://img.shields.io/badge/Stack-Full%20Stack-blue)
![License](https://img.shields.io/badge/License-MIT-orange)

Uma plataforma premium, moderna e intuitiva projetada para pequenos produtores rurais gerenciarem seus rebanhos, produções e finanças com precisão e segurança.

**🌐 Link do Projeto:** [gestao-pecuaria.netlify.app](https://gestao-pecuaria.netlify.app/)

---

## ✨ Funcionalidades

### 🔐 Segurança e Autenticação
- **Sistema de Login/Cadastro**: Proteção completa com criptografia de senhas (BCrypt).
- **Verificação de Email**: Ativação de conta via código de 6 dígitos enviado por e-mail (Integração Brevo).
- **Segurança JWT**: Todas as rotas do backend são protegidas por tokens JWT.
- **Isolamento Total de Dados**: Cada usuário possui seu próprio ambiente. Os animais e registros que você cadastra são visíveis **apenas para você**.

### 🐄 Módulos de Gestão
- **Animais**: Cadastro completo (tipo, idade, finalidade, quantidade) com rastreamento por usuário.
- **Produção**: Registro de produção (leite, carne, ovos, etc.) vinculado ao animal específico.
- **Gestão Financeira**: Controle rigoroso de receitas e despesas por categorias (vendas, manutenção, impostos).
- **Saúde Animal**: Histórico de vacinas, tratamentos e consultas veterinárias com alertas de "próxima dose".

### 📊 Inteligência e Relatórios
- **Painel de Relatórios**: Visão geral com estatísticas em tempo real:
  - Saldo financeiro consolidado.
  - Distribuição do rebanho por tipo.
  - Gráficos e tabelas automáticas de produção e saúde.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **Angular 17**: Framework moderno para aplicação SPA.
- **CSS3 Vanilla**: Design customizado com estética premium, glassmorphism e animações.
- **RxJS**: Gerenciamento de estado reativo.
- **MDBootstrap**: Componentes de interface elegantes.

### Backend
- **Spring Boot 3 (Java 21)**: API robusta e escalável.
- **Spring Security + JWT**: Gestão de autenticação e autorização.
- **Spring Data JPA**: Abstração de persistência de dados.
- **JavaMailSender**: Integração com SMTP para notificações.

### Infraestrutura / Cloud
- **Banco de Dados**: MySQL gerenciado na nuvem via **Aiven**.
- **Hospedagem Backend**: **Render** (via Docker).
- **Hospedagem Frontend**: **Netlify**.
- **Serviço de Email**: **Brevo (Sendinblue)**.

---

## 🛠️ Como rodar o projeto localmente

Deseja testar ou contribuir para o projeto em sua própria máquina? Siga os passos abaixo:

### Pré-requisitos
- **Java 21** instalado.
- **Node.js 18+** instalado.
- **MySQL** rodando localmente.

### 1. Banco de Dados
No seu MySQL, crie o schema:
```sql
CREATE DATABASE pecuaria_db;
```

### 2. Configurando o Backend
1. Navegue até a pasta `backend`.
2. Abra o arquivo `src/main/resources/application.properties`.
3. Configure o seu usuário e senha do MySQL local e suas chaves do Brevo (opcional para teste local).
4. Execute o comando:
```bash
./mvnw spring-boot:run
```
O servidor iniciará em `http://localhost:8081`.

### 3. Configurando o Frontend
1. Navegue até a pasta `frontend`.
2. Instale as dependências:
```bash
npm install
```
3. Inicie o servidor de desenvolvimento:
```bash
npm start
```
O site estará disponível em `http://localhost:4200` (ou 4201).

---

## 👤 Desenvolvedor

**Igor Coding**  
*Desenvolvedor Full Stack apaixonado por criar soluções que impactam o dia a dia das pessoas.*

---
*Este projeto foi desenvolvido como parte de um portfólio profissional.*
