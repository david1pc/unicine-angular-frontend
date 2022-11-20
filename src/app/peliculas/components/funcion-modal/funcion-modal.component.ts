import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Ciudad, Teatro } from 'src/app/admin/interfaces/admin.interface';
import { AdminTeatroService } from 'src/app/admin/services/admin-teatro.service';
import { BusquedaFunciones } from '../../interfaces/peliculas.interface';

@Component({
  selector: 'app-funcion-modal',
  templateUrl: './funcion-modal.component.html',
  styleUrls: ['./funcion-modal.component.css'],
})
export class FuncionModalComponent implements OnInit {
  ciudad!: Ciudad;
  teatro!: Teatro;
  ciudades: Ciudad[] = [];
  teatros: Teatro[] = [];

  constructor(
    private adminTeatroService: AdminTeatroService,
    public dialogRef: MatDialogRef<FuncionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BusquedaFunciones
  ) {}

  ngOnInit(): void {
    this.adminTeatroService.listarCiudades().subscribe((result) => {
      this.ciudades = result.ciudades;
    });

    this.adminTeatroService.listarTeatros().subscribe((result: any) => {
      this.teatros = result.teatros;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
