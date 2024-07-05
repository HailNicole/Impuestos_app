import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Impuestos } from '../models/impuestos';
import { catchError, Observable, throwError } from 'rxjs';

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

  
  getUserId(): Observable<any> {
    return this.http.get<any>(this.URL + '/getUserId').pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al obtener el ID del usuario:', error.message);
        return throwError(() => new Error('Error al obtener el ID del usuario'));
      })
    );
  }
}