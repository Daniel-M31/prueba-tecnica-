import { PeliculaSalaForm } from './pelicula-sala-form/pelicula-sala-form';

import { Routes } from '@angular/router';

import { Dashboard } from './dashboard/dashboard';
import { PeliculasForm } from './peliculas-form/peliculas-form';

import { Login } from './login/login';
import { Salas } from './salas/salas';


export const routes: Routes = [
 { path: '', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'gestionSalas', component: Salas },
  { path: 'salas', component: PeliculasForm },
  { path: 'cartelera', component: PeliculaSalaForm },
  { path: '**', redirectTo: '' }

];
