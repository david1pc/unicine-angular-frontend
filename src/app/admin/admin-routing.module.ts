import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTeatroComponent } from './pages/admin-teatro/admin-teatro.component';
import { ConfiteriaComponent } from './pages/confiteria/confiteria.component';
import { CuponesComponent } from './pages/cupones/cupones.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoPeliculasComponent } from './pages/listado-peliculas/listado-peliculas.component';
import { TeatrosComponent } from './pages/teatros/teatros.component';

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
        path: 'teatro',
        component: AdminTeatroComponent,
      },
      {
        path: 'confiteria',
        component: ConfiteriaComponent,
      },
      {
        path: 'teatros',
        component: TeatrosComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
