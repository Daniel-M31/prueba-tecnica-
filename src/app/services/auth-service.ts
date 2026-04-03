import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 private usuarioLogueado: string | null = null;

  constructor() {
    // 🔥 CARGAR al iniciar (CLAVE)
    this.usuarioLogueado = localStorage.getItem('username');
  }

  validarCredenciales(usuario: string, password: string): boolean {
    const userDefault = 'DanielM';
    const passDefault = '1234';

    if (usuario === userDefault && password === passDefault) {
      this.login(usuario);
      return true;
    }
    return false;
  }

  login(usuario: string) {
    this.usuarioLogueado = usuario;
    localStorage.setItem('username', usuario); 
  }

  logout() {
    this.usuarioLogueado = null;
    localStorage.removeItem('username'); 
  }

  getUsuario(): string | null {
    return this.usuarioLogueado;
  }

  estaLogueado(): boolean {
    return this.usuarioLogueado !== null;
  }
}