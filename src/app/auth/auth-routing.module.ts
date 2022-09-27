import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RecuperacionCuentaCorreoComponent } from './pages/recuperacion-cuenta-correo/recuperacion-cuenta-correo.component';
import { RecuperacionCuentaPasswordComponent } from './pages/recuperacion-cuenta-password/recuperacion-cuenta-password.component';

const rutas: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registro',
        component: RegistroComponent,
      },
      {
        path: 'recuperacion',
        component: RecuperacionCuentaCorreoComponent,
      },
      {
        path: 'recuperacion/:token',
        component: RecuperacionCuentaPasswordComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
