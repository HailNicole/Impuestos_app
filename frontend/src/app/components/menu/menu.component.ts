import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  constructor(public authService:AuthService, private router:Router) { }
  ngOnInit(): void { }

  Autenticacion(){
    return this.authService.loggedIn()
  }
}