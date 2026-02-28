import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthResponse {
    token?: string;
    nome?: string;
    email?: string;
    id?: number;
    nomeFazenda?: string;
    mensagem?: string;
    requerVerificacao?: boolean;
    erro?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

    isLoggedIn$ = this.loggedIn.asObservable();

    constructor(private http: HttpClient) { }

    private hasToken(): boolean {
        return !!localStorage.getItem('jwt_token');
    }

    registrar(data: { nome: string; email: string; senha: string; nomeFazenda: string }): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/registrar`, data);
    }

    verificar(data: { email: string; codigo: string }): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/verificar`, data).pipe(
            tap(res => {
                if (res.token) {
                    this.saveAuth(res);
                }
            })
        );
    }

    reenviarCodigo(email: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/reenviar-codigo`, { email });
    }

    login(data: { email: string; senha: string }): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
            tap(res => {
                if (res.token) {
                    this.saveAuth(res);
                }
            })
        );
    }

    private saveAuth(res: AuthResponse): void {
        if (res.token) {
            localStorage.setItem('jwt_token', res.token);
            localStorage.setItem('user_nome', res.nome || '');
            localStorage.setItem('user_email', res.email || '');
            localStorage.setItem('user_id', (res.id || '').toString());
            this.loggedIn.next(true);
        }
    }

    logout(): void {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_nome');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_id');
        this.loggedIn.next(false);
    }

    getToken(): string | null {
        return localStorage.getItem('jwt_token');
    }

    getUserNome(): string {
        return localStorage.getItem('user_nome') || '';
    }

    isLoggedIn(): boolean {
        return this.hasToken();
    }
}
