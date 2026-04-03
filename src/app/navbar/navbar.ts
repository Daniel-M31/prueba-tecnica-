import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth-service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
 username: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsuario(); 
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
