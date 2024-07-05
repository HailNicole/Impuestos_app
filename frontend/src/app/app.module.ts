import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { Routes, RouterModule, RouterLinkActive } from '@angular/router';
import { HttpClientModule,withFetch,provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";
import { ImpuestoComponent } from './components/impuesto/impuesto.component';
import { GastoComponent } from './components/gasto/gasto.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './auth.guard';


const rutas: Routes = [
  { path: 'informacion', component: InformacionComponent },
  { path: 'gastos', component: FormularioComponent },
  { path: 'formulario_IR', component: ImpuestoComponent, canActivate:[AuthGuard]},
  { path: 'reporte', component: ReporteComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    InformacionComponent,
    MenuComponent,
    FormularioComponent,
    ReporteComponent,
    ImpuestoComponent,
    GastoComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rutas),
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    provideClientHydration(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }