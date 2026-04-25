import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @Output() loginExitoso = new EventEmitter<void>(); // ← avisa al padre

  user = {
    usuario: '',
    contrasena: ''
  };

  constructor(private authService: AuthService) {} // ← quitamos Router

  onLogin() {
    this.authService.login(this.user.usuario, this.user.contrasena).subscribe({
      next: (response) => {
        console.log('Login exitoso');
        this.loginExitoso.emit(); // ← emite el evento al padre
      },
      error: (error) => {
        console.error('Error en el login', error);
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}
