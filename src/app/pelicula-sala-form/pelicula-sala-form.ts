import { Component, OnInit } from '@angular/core';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Navbar } from '../navbar/navbar';


@Component({
  selector: 'app-pelicula-sala-form',
  imports: [CommonModule, FormsModule,Navbar],
  templateUrl: './pelicula-sala-form.html',
  styleUrl: './pelicula-sala-form.css',
})
export class PeliculaSalaForm  implements OnInit {

  peliculas: any[] = [];
  salas: any[] = [];
  asignaciones: any[] = [];

  asignacionModel: any = {
    id_pelicula_sala: 0,
    id_pelicula: 0,
    id_sala: 0,
    fecha_publicacion: '',
    fecha_fin: '',
    estado: true
  };

  isEdit: boolean = false;

  constructor(private api: Api) {}
  ngOnInit(): void {
    this.cargarPeliculas();
    this.cargarSalas();
    this.cargarAsignaciones();
  }
getNombrePelicula(id: number): string {
  const peli = this.peliculas.find(p => p.id_pelicula === id);
  return peli ? peli.nombre : 'N/A';
}
getNombreSala(id: number): string {
  const sala = this.salas.find(s => s.id_sala === id);
  return sala ? sala.nombre : 'N/A';
}
  cargarPeliculas() {
    this.api.getPeliculas().subscribe({
      next: (data: any) => this.peliculas = data.filter((p: any) => p.estado),
      error: (err: any) => console.error(err)
    });
  }

  cargarSalas() {
    this.api.getSalas().subscribe({
      next: (data: any) => this.salas = data.filter((s: any) => s.estado),
      error: (err: any) => console.error(err)
    });
  }

  cargarAsignaciones() {
    this.api.getCartelera().subscribe({
      next: (data: any) => this.asignaciones = data,
      error: (err: any) => console.error(err)
    });
  }

  guardarAsignacion() {
  if (
    this.asignacionModel.id_pelicula === 0 ||
    this.asignacionModel.id_sala === 0 ||
    !this.asignacionModel.fecha_publicacion ||
    !this.asignacionModel.fecha_fin
  ) {
    alert('Todos los campos son obligatorios');
    return;
  }

  if (this.isEdit) {
    
    this.api.actualizarCartelera(
      this.asignacionModel.id_pelicula_sala,
      this.asignacionModel
    ).subscribe({
      next: () => {
        this.cargarAsignaciones();
        this.limpiar();
      },
      error: (err: any) => console.error(err)
    });

  } else {
   
    const nuevaAsignacion = {
      id_pelicula: this.asignacionModel.id_pelicula,
      id_sala: this.asignacionModel.id_sala,
      fecha_publicacion: this.asignacionModel.fecha_publicacion,
      fecha_fin: this.asignacionModel.fecha_fin,
      estado: true
    };

    this.api.crearCartelera(nuevaAsignacion).subscribe({
      next: () => {
        this.cargarAsignaciones();
        this.limpiar();
      },
      error: (err: any) => console.error(err)
    });
  }
}
  editarAsignacion(asignacion: any) {
    this.asignacionModel = { ...asignacion };
    this.isEdit = true;
  }

  eliminarAsignacion(asignacion: any) {
    if (confirm(`¿Seguro que quieres eliminar esta asignacion?`)) {
      this.api.actualizarCartelera(asignacion.id_pelicula_sala, { ...asignacion, estado: false }).subscribe({
        next: () => this.cargarAsignaciones()
      });
    }
  }

  limpiar() {
    this.asignacionModel = {
      id_pelicula_sala: 0,
      id_pelicula: 0,
      id_sala: 0,
      fecha_publicacion: '',
      fecha_fin: '',
      estado: true
    };
    this.isEdit = false;
  }

}