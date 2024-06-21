import { Component, OnInit} from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { Gasto } from '../../models/gasto';
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

  constructor(private gastoService:GastoService, private impuestoService:ImpuestosService) {
    this.ObtenerDatosGasto();
    this.ObtenerDatosImpuesto();
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
}