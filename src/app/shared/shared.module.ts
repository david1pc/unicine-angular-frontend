import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CarritoComponent } from './carrito/carrito.component';

@NgModule({
  declarations: [HomeComponent, NavbarComponent, BreadcrumbComponent, CarritoComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, BreadcrumbComponent],
})
export class SharedModule {}
