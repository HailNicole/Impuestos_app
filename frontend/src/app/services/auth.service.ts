import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient, private router:Router) { }

  signUp(user:{email:string; password:string;}){
    return this.http.post<any>(this.URL + '/register',user);
  }

  signIn(user:{email:string; password:string;}){
    return this.http.post<any>(this.URL + '/login',user);
  }

  //verifica si el token existe
  loggedIn(){
    return !!localStorage.getItem('token'); //Si el token existe retorna True
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
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}
