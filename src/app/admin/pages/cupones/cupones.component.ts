import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/admin.interface';
import { AdminService } from '../../services/admin.service';

export interface PeliculaElement {
  codigo: number;
  nombre: string;
  sinopsis: string;
  url_trailer: string;
  url_img: string;
  genero: string;
  estado: boolean;
  reparto: string;
}

@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.component.html',
  styleUrls: ['./cupones.component.css'],
})
export class CuponesComponent implements OnInit {
  peliculas: Pelicula[] = [];
  peliculas_dos: PeliculaElement[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.listarPeliculas().subscribe((resultado) => {
      this.peliculas = resultado.peliculas;
    });
  }

  verPeliculas() {
    /* let peliculas: PeliculaElement[] = [];
    let pelicula: PeliculaElement;

    for (let i = 0; i < this.peliculas.length; i++) {
      pelicula = {
        codigo: peliculas[i].codigo,
        nombre: peliculas[i].nombre,
        sinopsis: peliculas[i].sinopsis,
        url_img: peliculas[i].url_img,
        url_trailer: peliculas[i].url_trailer,
        genero: peliculas[i].genero,
        estado: peliculas[i].estado,
        reparto: peliculas[i].reparto,
      };
      this.peliculas.push(pelicula);
    }
    this.peliculas_dos = peliculas; */

    console.log(this.peliculas);
  }
}
