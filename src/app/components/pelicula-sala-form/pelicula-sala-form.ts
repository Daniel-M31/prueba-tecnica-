import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../navbar/navbar';
import { Pelicula } from '../../Models/pelicula';
import { SalaCine } from '../../Models/sala_cine';
import { PeliculaSala } from '../../Models/pelicula_sala_cine';
import { PeliculaSalaService } from '../../Services/pelicula-sala-service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-pelicula-sala-form',
  imports: [CommonModule, FormsModule,Navbar],
  templateUrl: './pelicula-sala-form.html',
  styleUrl: './pelicula-sala-form.css',
})
export class PeliculaSalaForm  implements OnInit {
     peliculas: Pelicula[] = [];
  salas: SalaCine[] = [];
  asignaciones: PeliculaSala[] = [];

  asignacionModel: PeliculaSala = {
    id_pelicula_sala: 0,
    id_pelicula: 0,
    id_sala: 0,
    fecha_publicacion: '',
    fecha_fin: '',
    estado: true
  };

  isEdit: boolean = false;

  constructor(private psService: PeliculaSalaService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  private cargarDatos(): void {
    forkJoin({
      peliculas: this.psService.getPeliculasActivas(),
      salas: this.psService.getSalasActivas(),
      asignaciones: this.psService.getAsignaciones()
    }).subscribe(({ peliculas, salas, asignaciones }) => {
      this.peliculas = peliculas;
      this.salas = salas;
      this.asignaciones = asignaciones;

    });
  }

  getNombrePelicula(id: number): string {
    const peli = this.peliculas.find(p => p.id_pelicula === id);
    return peli?.nombre ?? 'N/A';
  }

  getNombreSala(id: number): string {
    const sala = this.salas.find(s => s.id_sala === id);
    return sala?.nombre ?? 'N/A';
  }

  guardarAsignacion(): void {
    const validacion = this.psService.validarAsignacion(this.asignacionModel);
    if (!validacion.valido) {
      alert(validacion.mensaje);
      return;
    }

    const obs = this.isEdit
      ? this.psService.actualizarAsignacion(this.asignacionModel)
      : this.psService.crearAsignacion(this.asignacionModel);

    obs.subscribe({
      next: () => {
        alert(this.isEdit ? 'Asignación actualizada' : 'Asignación creada');
        this.postGuardar();
      },
      error: err => console.error(err)
    });
  }

  editarAsignacion(asignacion: PeliculaSala): void {
    this.asignacionModel = { ...asignacion };
    this.isEdit = true;
  }

  eliminarAsignacion(asignacion: PeliculaSala): void {
    if (confirm('¿Seguro que quieres eliminar esta asignación?')) {
      this.psService.eliminarAsignacion(asignacion).subscribe({
        next: () => this.cargarDatos()
      });
    }
  }

  limpiar(): void {
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

  private postGuardar(): void {
    this.limpiar();
    this.cargarDatos();
 
     }
      }