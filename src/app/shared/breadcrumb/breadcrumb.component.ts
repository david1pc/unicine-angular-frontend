import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BreadCrumb } from '../interfaces/breadcrumb.interface';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  parentLinks: BreadCrumb[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.parentLinks.push({
      nombre: 'inicio',
      url: '/',
    });

    let previousUrl: string = '';

    this.router.url
      .split('/')
      .splice(1)
      .map((nombre) => {
        previousUrl += '/' + nombre;
        this.parentLinks.push({
          nombre: nombre,
          url: previousUrl,
        });
      });
  }
}
