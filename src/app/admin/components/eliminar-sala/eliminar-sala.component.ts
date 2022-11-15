import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-sala',
  templateUrl: './eliminar-sala.component.html',
  styleUrls: ['./eliminar-sala.component.css'],
})
export class EliminarSalaComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EliminarSalaComponent>,
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
