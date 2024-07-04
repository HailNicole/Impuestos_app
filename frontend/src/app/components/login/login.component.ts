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
  /*readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required, Validators.nullValidator]);*/
  errorMessage = signal('');
  email:string = "";
  password:string = "";

  constructor(private authService:AuthService, private router:Router, private fb: FormBuilder){
    /*merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());*/
    this.formulario = this.fb.group({email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.nullValidator]]
    });
  }

  /*updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }*/

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