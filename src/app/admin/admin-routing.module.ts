import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTeatroComponent } from './pages/admin-teatro/admin-teatro.component';
import { CombosComponent } from './pages/combos/combos.component';
import { ConfiteriaComponent } from './pages/confiteria/confiteria.component';
import { CuponesComponent } from './pages/cupones/cupones.component';
import { DistribucionesSillasComponent } from './pages/distribuciones-sillas/distribuciones-sillas.component';
import { FuncionesComponent } from './pages/funciones/funciones.component';
import { HomeComponent } from './pages/home/home.component';
import { HorariosComponent } from './pages/horarios/horarios.component';
import { ListadoPeliculasComponent } from './pages/listado-peliculas/listado-peliculas.component';
import { SalasComponent } from './pages/salas/salas.component';
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
        path: 'combos',
        component: CombosComponent,
      },
      {
        path: 'salas',
        component: SalasComponent,
      },
      {
        path: 'distribuciones',
        component: DistribucionesSillasComponent,
      },
      {
        path: 'horarios',
        component: HorariosComponent,
      },
      {
        path: 'funciones',
        component: FuncionesComponent,
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
