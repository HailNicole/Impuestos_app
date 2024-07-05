import { Component, signal} from '@angular/core';
import {Validators, FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {User} from '../../models/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';

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
  readonly email_valid = new FormControl('', [Validators.required, Validators.email]);

  constructor(private authService:AuthService, private router:Router, private fb: FormBuilder){
    this.formulario = this.fb.group({
      password: ['', [Validators.required, Validators.nullValidator]]
    });

    merge(this.email_valid.statusChanges, this.email_valid.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  Validar(){
      if(this.formulario.valid && this.email_valid.valid){
        this.email = this.email_valid.value ?? '';
        const emailValue = this.email_valid.value;
        this.email = emailValue !== null ? emailValue : '';
        this.password = this.formulario.value.password;
        this.signIn();
      }
  }

  signIn(){
    let user = new User(this.email,this.password);
    this.authService.signIn(user).subscribe(res => {
      this.authService.setToken(res.token)
      this.router.navigate(['/'])                                                                                                                     
    },error => {
      if (error.error && error.error.message) {
        console.error('Error de autenticación:', error.error.message);
        //this.errorMessage = error.error.message; // Asigna el mensaje de error a la variable
        this.errorMessage.set(error.error.message);
      } else {
        console.error('Credenciales inválidas', error);
        this.errorMessage.set('Credenciales inválidas');
      }
    });
  }

  updateErrorMessage() {
    if (this.email_valid.hasError('require')) {
      this.errorMessage.set('Debe ingresar un valor');
    } else if (this.email_valid.hasError('email')) {
      this.errorMessage.set('No es un email valido');
    } else {
      this.errorMessage.set('');
    }
  }
}