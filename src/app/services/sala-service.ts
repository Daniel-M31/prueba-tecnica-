import { Injectable } from '@angular/core';
import { Api } from './api';
import { Observable } from 'rxjs';
import { SalaCine } from '../Models/sala_cine';


@Injectable({
  providedIn: 'root',
})
export class SalaService {
 constructor(private api: Api) {}

  getSalas(): Observable<SalaCine[]> {
    return this.api.getSalas();
  }

  crearSala(sala: SalaCine): Observable<any> {
    return this.api.crearSala(sala);
  }

  actualizarSala(id: number, sala: SalaCine): Observable<any> {
    return this.api.actualizarSala(id, sala);
  }

  eliminarSala(sala: SalaCine): Observable<any> {
    const salaDesactivada: SalaCine = { ...sala, estado: false };
    return this.api.actualizarSala(sala.id_sala, salaDesactivada);
  }

  validarSala(sala: SalaCine): { valido: boolean, mensaje?: string } {
    if (!sala.nombre.trim()) {
      return { valido: false, mensaje: 'El nombre de la sala es obligatorio' };
    }
    return { valido: true };
  }
}