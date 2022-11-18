import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DistribucionSillas } from '../../interfaces/admin.interface';
import { EsquemaComponent } from '../esquema/esquema.component';

@Component({
  selector: 'app-agregar-distribucion-silla',
  templateUrl: './agregar-distribucion-silla.component.html',
  styleUrls: ['./agregar-distribucion-silla.component.css'],
})
export class AgregarDistribucionSillaComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AgregarDistribucionSillaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DistribucionSillas,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  verEsquema() {
    let total_s = this.data.columnas * this.data.filas;
    if (this.data.esquema) {
      total_s = this.data.total_sillas;
    }
    const dialogRef = this.dialog.open(EsquemaComponent, {
      width: '90%',
      height: '90%',
      data: {
        columnas: this.data.columnas,
        filas: this.data.filas,
        total_sillas: total_s,
        esquema: this.data.esquema,
      },
    });

    dialogRef.afterClosed().subscribe((result: DistribucionSillas) => {
      if (!result) {
        return;
      }
      this.data.total_sillas = result.total_sillas;
      this.data.esquema = result.esquema;
    });
  }
}
