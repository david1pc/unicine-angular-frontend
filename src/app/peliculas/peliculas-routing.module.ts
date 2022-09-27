import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';

const rutas: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pelicula/:ciudad',
        component: PeliculaComponent,
      },
      {
        path: '**',
        component: ListadoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule],
})
export class PeliculasRoutingModule {}
