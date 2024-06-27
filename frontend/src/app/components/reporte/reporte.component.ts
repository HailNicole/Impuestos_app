import { Component, OnInit} from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { Gasto } from '../../models/gasto';
import { User } from '../../models/user';
import { ImpuestosService } from '../../services/impuestos.service';
import { Impuestos } from '../../models/impuestos';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent implements OnInit{
  ngOnInit(): void { }

  gastos:Gasto[]=[];
  datos:Impuestos[]=[];
  users:User[]=[];

  constructor(private gastoService:GastoService, private impuestoService:ImpuestosService) {
    this.ObtenerDatosGasto();
    this.ObtenerDatosImpuesto();
    this.ObtenerDatosUser();
  }

  ObtenerDatosGasto(){
    this.gastoService.obtenerDatos().subscribe(data =>{
      console.log(data);
      this.gastos=data;
    });
  }

  ObtenerDatosImpuesto(){
    this.impuestoService.obtenerDatos().subscribe(data =>{
      console.log(data);
      this.datos=data;
    });
  }

  ObtenerDatosUser(){
    this.gastoService.obtenerUsers().subscribe(data =>{
      console.log(data);
      this.users=data;
    });
  }
}