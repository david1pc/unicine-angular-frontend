import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-distribucion-sillas',
  templateUrl: './eliminar-distribucion-sillas.component.html',
  styleUrls: ['./eliminar-distribucion-sillas.component.css']
})
export class EliminarDistribucionSillasComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EliminarDistribucionSillasComponent>,
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
