import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Salas } from './components/salas/salas';
import { PeliculasForm } from './components/peliculas-form/peliculas-form';
import { PeliculaSalaForm } from './components/pelicula-sala-form/pelicula-sala-form';





export const routes: Routes = [
 { path: '', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'gestionSalas', component: Salas },
  { path: 'salas', component: PeliculasForm },
  { path: 'cartelera', component: PeliculaSalaForm },
  { path: '**', redirectTo: '' }

];
