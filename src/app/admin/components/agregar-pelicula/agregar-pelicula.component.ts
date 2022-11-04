import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pelicula } from '../../interfaces/admin.interface';

@Component({
  selector: 'app-agregar-pelicula',
  templateUrl: './agregar-pelicula.component.html',
  styleUrls: ['./agregar-pelicula.component.css'],
})
export class AgregarPeliculaComponent implements OnInit {
  generos: String[] = [];
  generoSeleccionado!: String;

  constructor(
    public dialogRef: MatDialogRef<AgregarPeliculaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pelicula
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.generos.push('ACCION');
    this.generos.push('ANIMADA');
    this.generos.push('CIENCIA_FICCION');
    this.generos.push('COMEDIA');
    this.generos.push('DRAMA');
    this.generos.push('ROMANCE');
    this.generos.push('TERROR');
  }
}
