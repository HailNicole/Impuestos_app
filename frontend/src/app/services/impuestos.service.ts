import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Impuestos } from '../models/impuestos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImpuestosService {
  private apiUrl='http://localhost:3000/api/datos_impuestos';

  constructor(private httpclient: HttpClient) {
    console.log('El servicio Http esta funcionando…');
  }

  obtenerDatos(){
    return this.httpclient.get<Impuestos[]>(this.apiUrl);
  }

  agregarDato(datos: Impuestos) : Observable<any>{
    const jsonContent = JSON.stringify(datos,null,2);
    console.log(jsonContent);
    return this.httpclient.post<Impuestos>(this.apiUrl, datos);
  }
}