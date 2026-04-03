import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth-service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

 usuario: string = '';
  password: string = '';
  mensaje: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    if (this.authService.validarCredenciales(this.usuario, this.password)) {
      this.authService.login(this.usuario);
      this.router.navigate(['/dashboard']);
    } else {
      this.mensaje = 'Usuario o contraseña incorrectos';
    }
  }
}