import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-teatro',
  templateUrl: './eliminar-teatro.component.html',
  styleUrls: ['./eliminar-teatro.component.css'],
})
export class EliminarTeatroComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EliminarTeatroComponent>,
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
