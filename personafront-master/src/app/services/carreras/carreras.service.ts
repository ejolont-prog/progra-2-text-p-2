import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  private API_SERVER = "http://localhost:8086/carreras";

  constructor(private httpClient: HttpClient) { }

  public getAllCarreras(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }



}
