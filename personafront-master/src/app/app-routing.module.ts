import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// 1. Importa tu componente de login
import { LoginComponent } from './components/login/login.component';
// Importa otros componentes que quieras mostrar después, ej:
// import { CarrerasComponent } from './components/carreras/carreras.component';

const routes: Routes = [
  // 2. Define la ruta inicial (vacía) para que redirija al login
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // 3. Define la ruta del login
  { path: 'login', component: LoginComponent },

  // 4. Aquí agregarías las demás rutas de tu sistema
  // { path: 'carreras', component: CarrerasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
