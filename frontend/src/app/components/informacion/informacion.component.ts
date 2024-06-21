import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.css'
})
export class InformacionComponent implements OnInit{
  constructor(){ }
  ngOnInit(): void { }
  deducibles=[{'Tipo':'Vivienda','Descripcion':'Corresponde a los desembolsos destinados a urbanizacion, la construccion y remodelacion de viviendas para el publico general','gasto':'500', 'imagen': '../assets/vivienda.jpg'},
    {'Tipo':'Salud','Descripcion':'Factores socioeconómicos y ambientales, como el acceso a agua limpia, la contaminación del aire y la exposición a toxinas, también afectan significativamente la salud de las poblaciones.','gasto':'1500', 'imagen': '../assets/salud.jpg'},
    {'Tipo':'Educacion','Descripcion':'Corresponde a los desembolsos destinados a urbanizacion, la construccion y remodelacion de viviendas para el publico general','gasto':'2500', 'imagen': '../assets/educacion.jpg'},
    {'Tipo':'Vestimenta','Descripcion':'Consideraciones éticas y ambientales, como la moda sostenible y el comercio justo, están ganando importancia en la industria textil global.','gasto':'1000', 'imagen': '../assets/vestimenta.jpg'},
    {'Tipo':'Alimentacion','Descripcion':'La alimentación equilibrada incluye una variedad de alimentos que proporcionan nutrientes esenciales como proteínas, carbohidratos, grasas, vitaminas y minerales.','gasto':'500', 'imagen': '../assets/alimentacion.jpg'}];


  informacion(deducible:string) {
    for (let i = 0; i < this.deducibles.length; i++) {
        if (deducible === this.deducibles[i].Descripcion) {
            alert(this.deducibles[i].Descripcion);
            break;
        }
    }
  }

  informacion_adicional(deducible:string) {
    for (let i = 0; i < this.deducibles.length; i++) {
        if (deducible === this.deducibles[i].gasto) {
          alert(this.deducibles[i].gasto);
            break;
        }
    }
  }

  borrarDeducible(deducible:string) {
    for (let i = 0; i < this.deducibles.length; i++) {
        if (deducible === this.deducibles[i].Tipo) {
            this.deducibles.splice(i, 1);
            break;
        }
    }
  }
}