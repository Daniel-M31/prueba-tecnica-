import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/dashboard-service';
import { Navbar } from '../../navbar/navbar';


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

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    // Obtenemos totales de salas
    this.dashboardService.getTotalesSalas().subscribe({
      next: data => {
        this.totalSalas = data.total;
        this.salasDisponibles = data.disponibles;
      },
      error: err => console.error('Error cargando salas:', err)
    });

    // Obtenemos total de películas
    this.dashboardService.getTotalPeliculas().subscribe({
      next: total => this.totalPeliculas = total,
      error: err => console.error('Error cargando películas:', err)
    });
  }
}