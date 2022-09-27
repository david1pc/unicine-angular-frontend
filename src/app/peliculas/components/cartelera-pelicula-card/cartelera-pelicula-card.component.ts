import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cartelera-pelicula-card',
  templateUrl: './cartelera-pelicula-card.component.html',
  styleUrls: ['./cartelera-pelicula-card.component.css'],
})
export class CarteleraPeliculaCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  mostrar() {
    const icons = document.querySelectorAll('.icon');

    for (var i = 0; i < icons.length; i++) {
      const item = icons[i].parentElement;
      item?.classList?.toggle('open');
    }
  }
}
