import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 1. Importa tus componentes
import { LoginComponent } from './components/login/login.component';
// Asegúrate de que el nombre del componente de la tabla coincida (normalmente AppComponent o PersonasComponent)
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'personas', component: AppComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
