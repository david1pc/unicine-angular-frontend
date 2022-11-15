import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-funcion',
  templateUrl: './eliminar-funcion.component.html',
  styleUrls: ['./eliminar-funcion.component.css'],
})
export class EliminarFuncionComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EliminarFuncionComponent>,
    @Inject(MAT_DIALOG_DATA) public estadoConfirmacion: Boolean
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  cambiarEstado(): void {
    this.estadoConfirmacion = true;
  }
}
