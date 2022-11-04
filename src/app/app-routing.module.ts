import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { CarritoComponent } from './shared/carrito/carrito.component';
import { AuthGuard } from './auth/guards/auth.guard';

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
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
