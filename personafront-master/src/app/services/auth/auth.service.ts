import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // <--- Cambia esto aquí

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8086/api/auth/login';

  constructor(private http: HttpClient) { }

  login(usuario: string, contrasena: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { usuario, contrasena }).pipe(
      tap(res => {
        if (res.token) {
          localStorage.setItem('token_umg', res.token);
        }
      })
    );
  }

  getToken() {
    return localStorage.getItem('token_umg');
  }

  logout() {
    localStorage.removeItem('token_umg');
  }
}
