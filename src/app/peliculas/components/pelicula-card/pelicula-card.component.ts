import { Component, Input, OnInit } from '@angular/core';
import { Funcion, Pelicula } from 'src/app/admin/interfaces/admin.interface';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-pelicula-card',
  templateUrl: './pelicula-card.component.html',
  styleUrls: ['./pelicula-card.component.css'],
})
export class PeliculaCardComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {}

  enviarPelicula(pelicula: Pelicula) {
    localStorage.removeItem('pelicula');
    this.peliculasService.cambiarPelicula(pelicula);
  }
}
