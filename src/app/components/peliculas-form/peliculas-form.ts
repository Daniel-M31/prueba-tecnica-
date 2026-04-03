import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../navbar/navbar';
import { Pelicula } from '../../Models/pelicula';
import { PeliculasService } from '../../Services/peliculas-service';


@Component({
  selector: 'app-peliculas-form',
  imports: [ FormsModule,CommonModule, Navbar ],
  templateUrl: './peliculas-form.html',
  styleUrl: './peliculas-form.css',
})
export class PeliculasForm implements OnInit {

  peliculas: Pelicula[] = [];
  peliculaModel: Pelicula = { id_pelicula: 0, nombre: '', duracion: 0, estado: true };
  isEdit: boolean = false;
  constructor(private peliculasService: PeliculasService) {}
  ngOnInit(): void {
    this.cargarPeliculas();
  }
  cargarPeliculas(): void {
    this.peliculasService.getPeliculas().subscribe({
      next: data => this.peliculas = data,
      error: err => console.error('Error cargando películas', err)
    });
  }
guardarPelicula(): void {
  const validacion = this.peliculasService.validarPelicula(this.peliculaModel);
  if (!validacion.valido) {
    alert(validacion.mensaje);
    return;
  }

  const accion$ = this.isEdit
    ? this.peliculasService.actualizarPelicula(this.peliculaModel)
    : this.peliculasService.crearPelicula(this.peliculaModel);

  accion$.subscribe({
    next: (resp: any) => {   
      alert(this.isEdit ? 'Película actualizada' : 'Película creada');

      if (this.isEdit) {

        const index = this.peliculas.findIndex(p => p.id_pelicula === this.peliculaModel.id_pelicula);
        if (index !== -1) this.peliculas[index] = { ...this.peliculaModel };
      } else {
        const peliculaCreada = resp.pelicula;
        this.peliculas.push(peliculaCreada);      
        this.peliculaModel = { ...peliculaCreada };
      }

      this.limpiar(); 
    },
    error: (err) => console.error('Error guardando película', err)
  });
}
  editarPelicula(pelicula: Pelicula): void {
    this.peliculaModel = { ...pelicula };
    this.isEdit = true;
  }

  eliminarPelicula(pelicula: Pelicula): void {
    if (confirm(`¿Seguro que quieres eliminar "${pelicula.nombre}"?`)) {
      this.peliculasService.eliminarPelicula(pelicula).subscribe({
        next: () => this.cargarPeliculas(),
        error: err => console.error('Error eliminando película', err)
      });
    }
  }

  limpiar(): void {
    this.peliculaModel = 
    { 
      id_pelicula: 0,
       nombre: '', 
       duracion: 0, 
       estado: true };
    this.isEdit = false;
  }
}