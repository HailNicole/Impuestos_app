import { Component , OnInit} from '@angular/core';
import { ImpuestosService } from '../../services/impuestos.service';
import { Impuestos } from '../../models/impuestos';

@Component({
  selector: 'app-impuesto',
  templateUrl: './impuesto.component.html',
  styleUrl: './impuesto.component.css'
})
export class ImpuestoComponent implements OnInit{

  datos:Impuestos[]=[];

  constructor(private impuestoService:ImpuestosService) { }
  ngOnInit():void {this.CargarDatos();}

  cedula:string='0';
  sa:number=0;
  salud:number=0;
  vivienda:number=0;
  vestimenta:number=0;
  educacion:number=0;
  alimentacion:number=0;
  gastos:number=0;
  base_imponible:number=0;
  fraccion_basica:number=0;
  impuesto_fraccion_basica:number=0;
  excedente:number=0;
  ve:number=0;
  porcentaje_excedente:number=0;
  ir:number=0;
  flag=false;

  CargarDatos(){
    this.impuestoService.obtenerDatos().subscribe(data =>{
      this.datos=data;
      console.log(data);
    });
  }

  validar_ingresos(){
    if(this.alimentacion>3809.65 || this.vivienda>3809.65 || this.educacion>3809.65 || this.vestimenta>3809.65 || this.salud>15232.60){
      this.flag=true;
    }else{
      this.flag=false;
    }
  }

  calcular_gasto() {
    this.gastos = this.salud + this.educacion + this.vestimenta + this.vivienda + this.alimentacion;
    return this.gastos;
  }

  calcular_base_imponible() {
    this.base_imponible = this.sa - this.calcular_gasto();
    return this.base_imponible;
  }

  calcular_excedente() {
    this.excedente = this.calcular_base_imponible() - this.calcular_fraccion_basica().fraccion_basica;
    let redondeo:number=Math.round(this.excedente);
    return redondeo;
  }

  calcular_porcentaje_excedente() {
    this.porcentaje_excedente = this.calcular_excedente() * this.calcular_fraccion_basica().ve;
    return this.porcentaje_excedente;
  }

  calcular_ir() {
    this.ir = this.calcular_fraccion_basica().impuesto_fraccion_basica + this.calcular_porcentaje_excedente();
    return this.ir;
  }

  calcular_fraccion_basica(){
    if(this.base_imponible > 0 && this.base_imponible <= 11722){
      this.fraccion_basica=0;
      this.impuesto_fraccion_basica=0;
      this.ve=0;
    }else if(this.base_imponible > 11722 && this.base_imponible <= 14930){
      this.fraccion_basica=11722;
      this.impuesto_fraccion_basica=0;
      this.ve=0.05;
    }else if(this.base_imponible > 14930 && this.base_imponible <= 19385){
      this.fraccion_basica=14930;
      this.impuesto_fraccion_basica=160;
      this.ve=0.1;
    }else if(this.base_imponible > 19385 && this.base_imponible <= 25638){
      this.fraccion_basica=19385;
      this.impuesto_fraccion_basica=606;
      this.ve=0.12;
    }else if(this.base_imponible > 25638 && this.base_imponible <= 33738){
      this.fraccion_basica=25638;
      this.impuesto_fraccion_basica=1356;
      this.ve=0.15;
    }else if(this.base_imponible > 33738 && this.base_imponible <= 44721){
      this.fraccion_basica=33738;
      this.impuesto_fraccion_basica=2571;
      this.ve=0.20;
    }else if(this.base_imponible > 44721 && this.base_imponible <= 59537){
      this.fraccion_basica=44721;
      this.impuesto_fraccion_basica=4768;
      this.ve=0.25;
    }else if(this.base_imponible > 59537 && this.base_imponible <= 79388){
      this.fraccion_basica=59537;
      this.impuesto_fraccion_basica=8472;
      this.ve=0.30;
    }else if(this.base_imponible > 79388 && this.base_imponible <= 105580){
      this.fraccion_basica=79388;
      this.impuesto_fraccion_basica=14427;
      this.ve=0.35;
    }else if(this.base_imponible > 105580){
      this.fraccion_basica=105580;
      this.impuesto_fraccion_basica=23594;
      this.ve=0.37;
    }
    return {
      fraccion_basica: this.fraccion_basica,
      impuesto_fraccion_basica: this.impuesto_fraccion_basica,
      ve: this.ve
    };
  }

  guardarResultado() {
    const res = {
      cedula:this.cedula,
      sa: this.sa,
      gastos: this.calcular_gasto(),
      base_imponible:this.calcular_base_imponible(),
      excedente:this.calcular_excedente(),
      porcentaje_excedente:this.calcular_porcentaje_excedente(),
      ir:this.calcular_ir()
    };
    // Convertir la factura a JSON
    const resultadoJSONString = JSON.stringify(res);
    localStorage.setItem('resultado', resultadoJSONString);
  }

  mostrar_resultado(){
    return{
      gastos: this.calcular_gasto(),
      base_imponible:this.calcular_base_imponible(),
      excedente:this.calcular_excedente(),
      porcentaje_excedente:this.calcular_porcentaje_excedente(),
      ir:this.calcular_ir()
    }
    this.guardarResultado();
  }

    GuardarDatos(datos:Impuestos){
      this.impuestoService.agregarDato(datos).subscribe(response => {
        console.log('Datos guardados con éxito', response);
      }, error => {
        console.error('Error al guardar los datos', error);
      });
    }

    Enviar(){
      let nuevoDato = new Impuestos(this.cedula,this.sa,this.salud,this.educacion,this.vestimenta,
      this.vivienda,this.alimentacion,this.calcular_gasto(),this.calcular_base_imponible(),this.calcular_excedente(),this.calcular_porcentaje_excedente(),this.calcular_ir());
      this.GuardarDatos(nuevoDato);
    }
}