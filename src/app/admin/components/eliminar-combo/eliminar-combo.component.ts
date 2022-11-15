import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-combo',
  templateUrl: './eliminar-combo.component.html',
  styleUrls: ['./eliminar-combo.component.css'],
})
export class EliminarComboComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EliminarComboComponent>,
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
