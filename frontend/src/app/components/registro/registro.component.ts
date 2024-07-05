import { Component, signal} from '@angular/core';
import {Validators, FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {User} from '../../models/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  formulario: FormGroup;
  email:string = "";
  password:string = "";
  errorMessage = signal('');
  email_valid = new FormControl('', [Validators.required, Validators.email]);

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
        this.signUp();
      }
  }

  signUp(){
    let user = new User(this.email,this.password);
    this.authService.signUp(user).subscribe(response => {
      localStorage.setItem('token',response.token);
      this.authService.setToken(response.token)
      alert('Usuario Registrado con Éxito')
      this.router.navigate(['/'])
    },error => {
      console.error('Credenciales Inválidas', error);
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
