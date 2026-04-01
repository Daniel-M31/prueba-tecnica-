import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
   username: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

  logout() {
    localStorage.removeItem('username');
    this.username = null;
    this.router.navigate(['/login']);
  }
}
