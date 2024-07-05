import { Component, signal} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {User} from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formulario: FormGroup;
  errorMessage = signal('');
  email:string = "";
  password:string = "";

  constructor(private authService:AuthService, private router:Router, private fb: FormBuilder){
    this.formulario = this.fb.group({email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.nullValidator]]
    });
  }

  Validar(){
      if(this.formulario.valid){
        this.email = this.formulario.value.email;
        this.password = this.formulario.value.password;
        this.signIn();
      }
    }

  signIn(){
    let user = new User(this.email,this.password);
    this.authService.signIn(user).subscribe(res => {
      localStorage.setItem('token',res.token);
      this.router.navigate(['/'])                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    },error => {
      console.error('Credenciales Inválidas', error);
    });
  }
}