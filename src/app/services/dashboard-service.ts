import { Injectable } from '@angular/core';
import { Api } from './api';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  constructor(private api: Api) {}


  getTotalesSalas(): Observable<{ total: number; disponibles: number }> {
    return this.api.getSalas().pipe(
      map((salas: any[]) => ({
        total: salas.length,
        disponibles: salas.filter(s => s.estado).length
      }))
    );
  }


  getTotalPeliculas(): Observable<number> {
    return this.api.getPeliculas().pipe(
      map((peliculas: any[]) => peliculas.length)
    );
  }
}