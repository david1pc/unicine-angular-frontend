import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  crispetasUrl: String = 'assets/img/popcorn.jpg';
  combosUrl: String = 'assets/img/combos.jpg';
  constructor() {}

  ngOnInit(): void {}
}
