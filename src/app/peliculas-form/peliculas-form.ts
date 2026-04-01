import { Component, OnInit } from '@angular/core';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-peliculas-form',
  imports: [ FormsModule,CommonModule, Navbar ],
  templateUrl: './peliculas-form.html',
  styleUrl: './peliculas-form.css',
})
export class PeliculasForm implements OnInit {

  peliculas: any[] = [];


  peliculaModel = {
    id_pelicula: 0,
    nombre: '',
    duracion: 0,
    estado: true
  };

  isEdit: boolean = false; 

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.cargarPeliculas();
  }
 cargarPeliculas() {
  this.api.getPeliculas().subscribe({
    next: (data) => {
      this.peliculas = data;

    },
    error: (err) => console.error(err)
  });
}

  guardarPelicula() {
    if(!this.peliculaModel.nombre.trim()) {
    alert('Debe ingresar un nombre para la película');
    return;
  }
  if(this.peliculaModel.duracion <= 0) {
    alert('La duración debe ser mayor a 0');
    return;
  }

  if(this.isEdit) {
    this.api.actualizarPelicula(this.peliculaModel.id_pelicula, this.peliculaModel).subscribe({
      next: () => {
        alert('Película actualizada');
        this.limpiar();
        this.cargarPeliculas();
      }
    });
  } else {
    this.api.crearPelicula(this.peliculaModel).subscribe({
      next: () => {
        alert('Película creada');
        this.limpiar();
        this.cargarPeliculas();
      }
    });
  }
  }

  editarPelicula(pelicula: any) {
    this.peliculaModel = { ...pelicula };
    this.isEdit = true;
  }

  eliminarPelicula(pelicula: any) {
    if(confirm(`¿Seguro que quieres eliminar "${pelicula.nombre}"?`)) {
      this.api.actualizarPelicula(pelicula.id_pelicula, { ...pelicula, estado: false }).subscribe({
        next: () => this.cargarPeliculas()
      });
    }
  }

  limpiar() {
    this.peliculaModel = { id_pelicula: 0, nombre: '', duracion: 0, estado: true };
    this.isEdit = false;
  }

}