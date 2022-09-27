import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CombosComponent } from './pages/combos/combos.component';
import { CrispetasComponent } from './pages/crispetas/crispetas.component';
import { ListadoComponent } from './pages/listado/listado.component';

const rutas: Routes = [
  {
    path: '',
    children: [
      {
        path: 'combos',
        component: CombosComponent,
      },
      {
        path: 'crispetas',
        component: CrispetasComponent,
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
export class ConfiteriaRoutingModule {}
