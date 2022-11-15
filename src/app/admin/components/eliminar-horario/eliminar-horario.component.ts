import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-horario',
  templateUrl: './eliminar-horario.component.html',
  styleUrls: ['./eliminar-horario.component.css'],
})
export class EliminarHorarioComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EliminarHorarioComponent>,
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
