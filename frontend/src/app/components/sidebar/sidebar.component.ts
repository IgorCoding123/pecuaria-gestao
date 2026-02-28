import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  userName = '';
  private sub!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sub = this.authService.isLoggedIn$.subscribe(logged => {
      this.isLoggedIn = logged;
      this.userName = this.authService.getUserNome();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
