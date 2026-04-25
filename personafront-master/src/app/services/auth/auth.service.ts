import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Apuntamos al puerto 8086 y al path definido en @RequestMapping("/api/auth")
  private API_SERVER = "http://localhost:8086/api/auth/login";

  constructor(private httpClient: HttpClient) { }

  /**
   * Envía las credenciales al backend.
   * @param usuario Objeto con { usuario, contrasena }
   */
  public login(usuario: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER, usuario);
  }
}
