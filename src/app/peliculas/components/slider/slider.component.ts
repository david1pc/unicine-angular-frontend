import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  
  peliculas: any[] = [
    {
      img: 'assets/img/marvel.jpg',
    },
    {
      img: 'assets/img/dc.jpg',
    },
    {
      img: 'assets/img/frozen.jpg',
    },
  ];

  constructor(private _config: NgbCarouselConfig) {
    _config.interval = 3000;
    _config.pauseOnHover = true;
  }

  ngOnInit(): void {}
}
