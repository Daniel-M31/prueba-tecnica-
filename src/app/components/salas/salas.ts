import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../navbar/navbar';
import { SalaService } from '../../Services/sala-service';
import { SalaCine } from '../../Models/sala_cine';



@Component({
  selector: 'app-salas',
  imports: [FormsModule, CommonModule,Navbar],
  templateUrl: './salas.html',
  styleUrl: './salas.css',
})
export class Salas implements OnInit {
  salas: SalaCine[] = [];

  salaModel: SalaCine = { 
    id_sala: 0, 
    nombre: '', 
    estado: true
   };
  isEdit: boolean = false;

  constructor(private salaService: SalaService) {}

  ngOnInit(): void {
    this.listarSalas();
  }

  listarSalas(): void {
    this.salaService.getSalas().subscribe({
      next: s => this.salas = s,
      error: e => console.error('Error al listar salas', e)
    });
  }

  guardarSala(): void {
    const validacion = this.salaService.validarSala(this.salaModel);
    if (!validacion.valido) {
      alert(validacion.mensaje);
      return;
    }

    const obs = this.isEdit
      ? this.salaService.actualizarSala(this.salaModel.id_sala, this.salaModel)
      : this.salaService.crearSala(this.salaModel);

    obs.subscribe({
      next: () => {
        alert(this.isEdit ? 'Sala actualizada' : 'Sala creada');
        this.postGuardar();
      },
      error: e => console.error(e)
    });
  }

  editarSala(sala: SalaCine): void {
    this.salaModel = { ...sala };
    this.isEdit = true;
  }

  eliminarSala(sala: SalaCine): void {
    if (confirm('¿Deseas desactivar esta sala?')) {
      this.salaService.eliminarSala(sala).subscribe({
        next: () => this.listarSalas()
      });
    }
  }

  limpiar(): void {
    this.salaModel = { id_sala: 0, nombre: '', estado: true };
    this.isEdit = false;
  }

  private postGuardar(): void {
    this.limpiar();
    this.listarSalas();
  }
}