import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { CarritoComponent } from './shared/carrito/carrito.component';
import { Error401Component } from './shared/error401/error401.component';

const rutas: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'carrito',
    component: CarritoComponent,
  },
  {
    path: 'error-401',
    component: Error401Component,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'cartelera',
    loadChildren: () =>
      import('./peliculas/peliculas.module').then((m) => m.PeliculasModule),
  },
  {
    path: 'confiteria',
    loadChildren: () =>
      import('./confiteria/confiteria.module').then((m) => m.ConfiteriaModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
