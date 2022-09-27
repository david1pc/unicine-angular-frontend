import { Component, OnInit } from '@angular/core';
import { Pelicula, Resultado } from '../../interfaces/peliculas.interface';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  estrenos: Pelicula[] = [];
  preventas: Pelicula[] = [];

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    this.peliculasService.getPeliculas().subscribe((resultado: any) => {
      this.estrenos = resultado.results;
    });

    this.peliculasService.getPeliculasPreventa().subscribe((resultado: any) => {
      this.preventas = resultado.results;
    });
  }
}
