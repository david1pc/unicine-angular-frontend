import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confiteria-opcion-card',
  templateUrl: './confiteria-opcion-card.component.html',
  styleUrls: ['./confiteria-opcion-card.component.css'],
})
export class ConfiteriaOpcionCardComponent implements OnInit {
  @Input() urlImg?: String;
  @Input() titulo?: String;
  @Input() descripcion?: String;

  constructor() {}

  ngOnInit(): void {}
}
