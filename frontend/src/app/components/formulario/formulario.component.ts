import { Component, OnInit } from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { Gasto } from '../../models/gasto';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})

export class FormularioComponent implements OnInit{
  gastos:Gasto[]=[];

  constructor(private gastoService:GastoService) { }
  ngOnInit():void {
    this.CargarDatos();
  }

  id:number=0;
  ruc:string='99999999001';
  valor:number=0.0;
  gasto:string='Ninguno';
  resultado:string='';

  CargarDatos(){
    this.gastoService.obtenerDatos().subscribe(data =>{
      this.gastos=data;
      console.log(data);
    });
  }

  GuardarDatos(nuevo_gastos:Gasto){
    this.gastoService.agregarDato(nuevo_gastos).subscribe(
      response => {
        console.log('Gasto agregado correctamente:', response);
        // Puedes manejar la respuesta del servidor aquí si es necesario
      },
      error => {
        console.error('Error al agregar gasto:', error);
        // Manejar errores aquí si es necesario
      });
  }

  Enviar(){
    let valor_array: Float32Array = new Float32Array([this.valor]);
    let nuevoGasto = new Gasto(this.gastos.length+1, this.gasto, this.ruc, this.valor);
    this.gastos.push(nuevoGasto);
    this.GuardarDatos(nuevoGasto);
  }
}