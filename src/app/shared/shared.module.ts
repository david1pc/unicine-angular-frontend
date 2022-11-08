import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CarritoComponent } from './carrito/carrito.component';
import { Error401Component } from './error401/error401.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    BreadcrumbComponent,
    CarritoComponent,
    Error401Component,
  ],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [NavbarComponent, BreadcrumbComponent, Error401Component],
})
export class SharedModule {}
