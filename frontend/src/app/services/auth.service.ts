import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient, private router:Router) { }

  signUp(user:{email:string; password:string;}){
    return this.http.post<any>(this.URL + '/register',user);
  }

  signIn(user: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/login`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  //verifica si el token existe
  loggedIn(){
    if(typeof localStorage !== 'undefined'){
      return !!localStorage.getItem('token'); //Si el token existe retorna True
    }else{
      return false
    }
     
  }

  setToken(token: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  getToken() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
