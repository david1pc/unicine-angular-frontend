import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-admin-teatro',
  templateUrl: './eliminar-admin-teatro.component.html',
  styleUrls: ['./eliminar-admin-teatro.component.css'],
})
export class EliminarAdminTeatroComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EliminarAdminTeatroComponent>,
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
