import { Component, OnInit } from '@angular/core';
import { Funcion, Pelicula } from 'src/app/admin/interfaces/admin.interface';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
})
export class PeliculaComponent implements OnInit {
  pelicula!: Pelicula;

  constructor(private peliculaService: PeliculasService) {}

  ngOnInit(): void {
    this.peliculaService.ultimaSeleccionPelicula.subscribe(
      (pelicula) => (this.pelicula = pelicula)
    );
  }
}
