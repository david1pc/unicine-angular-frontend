import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/peliculas.interface';

@Component({
  selector: 'app-pelicula-card',
  templateUrl: './pelicula-card.component.html',
  styleUrls: ['./pelicula-card.component.css'],
})
export class PeliculaCardComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];
  imgUrl: string = 'https://image.tmdb.org/t/p/w500';

  constructor() {}

  ngOnInit(): void {}
}
