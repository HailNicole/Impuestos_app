import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Gasto } from '../models/gasto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GastoService {

  private apiUrl='http://localhost:3000/api/datos';

  constructor(private httpclient: HttpClient) {
    console.log('El servicio Http esta funcionando…');
  }

  obtenerDatos(){
    return this.httpclient.get<Gasto[]>(this.apiUrl);
  }

  agregarDato(datos: Gasto) : Observable<any>{
    const jsonContent = JSON.stringify(datos,null,2);
    console.log(jsonContent);
    return this.httpclient.post<Gasto>(this.apiUrl, datos);
  }
}