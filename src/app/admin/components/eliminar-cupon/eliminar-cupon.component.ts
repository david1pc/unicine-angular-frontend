import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-cupon',
  templateUrl: './eliminar-cupon.component.html',
  styleUrls: ['./eliminar-cupon.component.css'],
})
export class EliminarCuponComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EliminarCuponComponent>,
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
