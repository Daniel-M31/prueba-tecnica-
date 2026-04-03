import { Injectable } from '@angular/core';
import { Api } from './api';
import { Observable } from 'rxjs';
import { Pelicula } from '../Models/pelicula';


@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  
 constructor(private api: Api) {}

  // Traer todas las películas
  getPeliculas(): Observable<Pelicula[]> {
    return this.api.getPeliculas();
  }

  validarPelicula(pelicula: Pelicula): { valido: boolean; mensaje?: string } {
    if (!pelicula.nombre.trim()) {
      return { valido: false, mensaje: 'Debe ingresar un nombre para la película' };
    }
    if (pelicula.duracion <= 0) {
      return { valido: false, mensaje: 'La duración debe ser mayor a 0' };
    }
    return { valido: true };
  }

  crearPelicula(pelicula: Pelicula): Observable<any> {
    return this.api.crearPelicula(pelicula);
  }

  actualizarPelicula(pelicula: Pelicula): Observable<any> {
    return this.api.actualizarPelicula(pelicula.id_pelicula, pelicula);
  }

  eliminarPelicula(pelicula: Pelicula): Observable<any> {
    const peliculaDesactivada: Pelicula = { ...pelicula, estado: false };
    return this.api.actualizarPelicula(pelicula.id_pelicula, peliculaDesactivada);
  }
}