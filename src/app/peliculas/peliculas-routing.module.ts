import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompraComponent } from './pages/compra/compra.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { SillasComponent } from './pages/sillas/sillas.component';

const rutas: Routes = [
  {
    path: '',
    children: [
      {
        path: 'funcion',
        component: PeliculaComponent,
      },
      {
        path: 'funcion/compra',
        component: CompraComponent,
      },
      {
        path: 'funcion/compra/sillas',
        component: SillasComponent
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
