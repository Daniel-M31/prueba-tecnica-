import { Component, OnInit } from '@angular/core';
import { SalaCine } from '../Model/sala_cine';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';
import { Api } from '../services/api';

@Component({
  selector: 'app-salas',
  imports: [FormsModule, CommonModule,Navbar],
  templateUrl: './salas.html',
  styleUrl: './salas.css',
})
export class Salas implements OnInit {

  salas: any[] = [];

  salaModel = {
    id_sala: 0,
    nombre: '',
    estado: true
  };

  isEdit = false;

  constructor(private api: Api) {}

  ngOnInit() {
    this.listarSalas();
  }

  listarSalas() {
    this.api.getSalas().subscribe((data) => {
      this.salas = data;
    });
  }

  guardarSala() {
    if (this.isEdit) {
      this.api.actualizarSala(this.salaModel.id_sala, this.salaModel)
        .subscribe(() => {
          this.limpiar();
          this.listarSalas();
        });
    } else {
      this.api.crearSala(this.salaModel)
        .subscribe(() => {
          this.limpiar();
          this.listarSalas();
        });
    }
  }

  editarSala(sala: any) {
    this.salaModel = { ...sala };
    this.isEdit = true;
  }

  eliminarSala(sala: any) {
  if (confirm('¿Deseas desactivar esta sala?')) {
    const data = { ...sala, estado: false };

    this.api.actualizarSala(sala.id_sala, data)
      .subscribe(() => {
        this.listarSalas();
      });
  }
}

  limpiar() {
    this.salaModel = {
      id_sala: 0,
      nombre: '',
      estado: true
    };
    this.isEdit = false;
  }

}