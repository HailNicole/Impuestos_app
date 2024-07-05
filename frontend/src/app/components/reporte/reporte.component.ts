import { Component, OnInit} from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Impuestos } from '../../models/impuestos';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent implements OnInit{
  ngOnInit(): void {this.getUserId(); }

  datos:Impuestos[]=[];
  user_id:string="";

  constructor(private tasksService: TasksService,private authService:AuthService) {
    
  }

  ObtenerDatosImpuesto(id_u:string){
    this.tasksService.getReportesById(id_u).subscribe(data =>{
      this.datos=data;
    });
  }

  getUserId(){
    this.tasksService.getUserId().subscribe(
      response => {
        this.user_id = response.user_id; // Asigna el ID del usuario a la propiedad userId
        this.ObtenerDatosImpuesto(this.user_id);
      },
      error => {
        console.error('Error al obtener el ID del usuario:', error);
      }
    );
  }
}