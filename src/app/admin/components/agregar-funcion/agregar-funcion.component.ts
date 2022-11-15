import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Funcion,
  Horario,
  Pelicula,
  Sala,
} from '../../interfaces/admin.interface';
import { AdminTeatroService } from '../../services/admin-teatro.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-agregar-funcion',
  templateUrl: './agregar-funcion.component.html',
  styleUrls: ['./agregar-funcion.component.css'],
})
export class AgregarFuncionComponent implements OnInit {
  salas!: Sala[];
  horarios!: Horario[];
  peliculas!: Pelicula[];

  constructor(
    private adminTeatroService: AdminTeatroService,
    private adminService: AdminService,
    public dialogRef: MatDialogRef<AgregarFuncionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Funcion
  ) {}

  ngOnInit(): void {
    this.adminTeatroService.listarSalas().subscribe((result) => {
      this.salas = result.salas;
    });

    this.adminService.listarPeliculas().subscribe((result: any) => {
      this.peliculas = result.peliculas;
    });

    this.adminTeatroService.listarHorarios().subscribe((result: any) => {
      this.horarios = result.horarios;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
