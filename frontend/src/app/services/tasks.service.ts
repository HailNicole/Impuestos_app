import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Impuestos } from '../models/impuestos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private URL = 'http://localhost:3000';
  private user_id = "sss"

  constructor(private http:HttpClient) { }

  getTasks(){
     return this.http.get<any>(this.URL+'/task');
  }

  getPrivateTasks(){
    return this.http.get<any>(this.URL+'/private-task');
 }

  CrearReporte(reporte:Impuestos){
    return this.http.post<any>(this.URL + '/agregar-reporte', reporte);
  }

  getReportesById(user_id:string): Observable<any>{
    return this.http.get<any>(this.URL + '/reportes/' + user_id);
  }

  getUserId(){
    return this.http.get<any>(this.URL+'/getUserId');
  }
}