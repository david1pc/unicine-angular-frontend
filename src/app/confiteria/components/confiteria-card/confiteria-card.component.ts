import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confiteria-card',
  templateUrl: './confiteria-card.component.html',
  styleUrls: ['./confiteria-card.component.css'],
})
export class ConfiteriaCardComponent implements OnInit {
  @Input() imgUrl?: String;
  @Input() titulo?: String;
  @Input() ruta?: String;

  constructor() {}

  ngOnInit(): void {}
}
