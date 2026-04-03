import { Injectable } from '@angular/core';
import { Api } from './api';
import { map, Observable } from 'rxjs';
import { PeliculaSala } from '../Models/pelicula_sala_cine';
import { Pelicula } from '../Models/pelicula';
import { SalaCine } from '../Models/sala_cine';


@Injectable({
  providedIn: 'root',
})
export class PeliculaSalaService {
 constructor(private api: Api) {}

  getAsignaciones(): Observable<PeliculaSala[]> {
  
    return this.api.getCartelera();

    
  }

  getPeliculasActivas(): Observable<Pelicula[]> {
    return this.api.getPeliculas().pipe(
      map((peliculas: Pelicula[]) => peliculas.filter((p: Pelicula) => p.estado))
    );
  }

  getSalasActivas(): Observable<SalaCine[]> {
    return this.api.getSalas().pipe(
      map((salas: SalaCine[]) => salas.filter((s: SalaCine) => s.estado))
    );
  }

  validarAsignacion(asignacion: PeliculaSala): { valido: boolean; mensaje?: string } {
    const { id_pelicula, id_sala, fecha_publicacion, fecha_fin } = asignacion;
    if (!id_pelicula || !id_sala || !fecha_publicacion || !fecha_fin) {
      return { valido: false, mensaje: 'Todos los campos son obligatorios' };
    }
    return { valido: true };
  }

  crearAsignacion(asignacion: PeliculaSala): Observable<any> {
    const nueva: Omit<PeliculaSala, 'id_pelicula_sala'> = { ...asignacion, estado: true };
    return this.api.crearCartelera(nueva);
  }

  actualizarAsignacion(asignacion: PeliculaSala): Observable<any> {
    return this.api.actualizarCartelera(asignacion.id_pelicula_sala, asignacion);
  }

  eliminarAsignacion(asignacion: PeliculaSala): Observable<any> {
    const desactivada = { ...asignacion, estado: false };
    return this.api.actualizarCartelera(asignacion.id_pelicula_sala, desactivada);
  }
}