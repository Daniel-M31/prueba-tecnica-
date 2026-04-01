import { Component, OnInit } from '@angular/core';
import { Api } from '../services/api';
import { Navbar } from '../navbar/navbar';



@Component({
  selector: 'app-dashboard',
  imports: [Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  totalSalas: number = 0;
  salasDisponibles: number = 0;
  totalPeliculas: number = 0;

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.cargarIndicadores();
  }

  cargarIndicadores() {

    this.api.getSalas().subscribe({
      next: (salas: any[]) => {
        this.totalSalas = salas.length;
        // Contar solo las activas
        this.salasDisponibles = salas.filter(s => s.estado).length;
      },
      error: (err) => console.error('Error al cargar salas', err)
    });


    this.api.getPeliculas().subscribe({
      next: (peliculas: any[]) => {
        this.totalPeliculas = peliculas.length;
      },
      error: (err) => console.error('Error al cargar películas', err)
    });
  }
}