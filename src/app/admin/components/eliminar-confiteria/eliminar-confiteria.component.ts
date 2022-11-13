import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-confiteria',
  templateUrl: './eliminar-confiteria.component.html',
  styleUrls: ['./eliminar-confiteria.component.css'],
})
export class EliminarConfiteriaComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EliminarConfiteriaComponent>,
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
