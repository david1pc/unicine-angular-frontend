import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ComprasComponent } from './components/compras/compras.component';

const rutas: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    children: [
      {
        path: 'compras',
        component: ComprasComponent,
      },
      {
        path: '**',
        component: PerfilComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule],
})
export class ClienteRoutingModule {}
