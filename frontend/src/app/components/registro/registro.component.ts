import { Component, signal} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {User} from '../../models/user';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  formulario: FormGroup;
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
        this.signUp();
      }
    }

  signUp(){
    let user = new User(this.email,this.password);
    this.authService.signUp(user).subscribe(response => {
      console.log(response)
      localStorage.setItem('token',response.token);
      //this.router.navigate(['/private/tasks'])
    },error => {
      console.error('Credenciales Inválidas', error);
    });
  }
}
