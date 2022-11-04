import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pelicula } from '../../interfaces/admin.interface';

@Component({
  selector: 'app-eliminar-pelicula',
  templateUrl: './eliminar-pelicula.component.html',
  styleUrls: ['./eliminar-pelicula.component.css'],
})
export class EliminarPeliculaComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EliminarPeliculaComponent>,
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
