import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private peliculasUrl = 'https://localhost:7031/api/peliculas'
  private salacineUrl = 'https://localhost:7031/api/sala_cine'
  private carteleracineUrl = 'https://localhost:7031/api/pelicula_sala_cine'

  constructor(private http: HttpClient) {}

  // servicios pelicula
  getPeliculas(): Observable<any> {
    return this.http.get(this.peliculasUrl);
  }

  getPelicula(id: number): Observable<any> {
    return this.http.get(`${this.peliculasUrl}/${id}`);
  }

  crearPelicula(data: any): Observable<any> {
    return this.http.post(this.peliculasUrl, data);
  }

  actualizarPelicula(id: number, data: any): Observable<any> {
    return this.http.put(`${this.peliculasUrl}/${id}`, data);
  }

  eliminarPelicula(id: number): Observable<any> {
    return this.http.delete(`${this.peliculasUrl}/${id}`);
  }

  // servicios salas

  getSalas(): Observable<any> {
    return this.http.get(this.salacineUrl);
  }

  getSala(id: number): Observable<any> {
    return this.http.get(`${this.salacineUrl}/${id}`);
  }

  crearSala(data: any): Observable<any> {
    return this.http.post(this.salacineUrl, data);
  }

  actualizarSala(id: number, data: any): Observable<any> {
    return this.http.put(`${this.salacineUrl}/${id}`, data);
  }

  eliminarSala(id: number): Observable<any> {
    return this.http.delete(`${this.salacineUrl}/${id}`);
  }



  // servicios cartelera
  getCartelera(): Observable<any> {
    return this.http.get(this.carteleracineUrl);
  }

  getCarteleraById(id: number): Observable<any> {
    return this.http.get(`${this.carteleracineUrl}/${id}`);
  }

  crearCartelera(data: any): Observable<any> {
    return this.http.post(this.carteleracineUrl, data);
  }

  actualizarCartelera(id: number, data: any): Observable<any> {
    return this.http.put(`${this.carteleracineUrl}/${id}`, data);
  }

  eliminarCartelera(id: number): Observable<any> {
    return this.http.delete(`${this.carteleracineUrl}/${id}`);
  }

}
