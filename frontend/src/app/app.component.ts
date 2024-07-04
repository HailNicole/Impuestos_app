import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public authService:AuthService){}
  title = 'frontend';
  Autenticacion(): boolean {
    return !!this.authService.getToken()
  }
}
