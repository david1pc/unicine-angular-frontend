import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuponesComponent } from './pages/cupones/cupones.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoPeliculasComponent } from './pages/listado-peliculas/listado-peliculas.component';

const rutas: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'listado-peliculas',
        component: ListadoPeliculasComponent,
      },
      {
        path: 'cupones',
        component: CuponesComponent,
      },
      {
        path: '**',
        redirectTo: 'listado-peliculas',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
