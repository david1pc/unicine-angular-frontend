import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RecuperacionCuentaCorreoComponent } from './pages/recuperacion-cuenta-correo/recuperacion-cuenta-correo.component';
import { RecuperacionCuentaPasswordComponent } from './pages/recuperacion-cuenta-password/recuperacion-cuenta-password.component';
import { MaterialModule } from '../material/material.module';
import { ActivacionCuentaComponent } from './pages/activacion-cuenta/activacion-cuenta.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    RecuperacionCuentaCorreoComponent,
    RecuperacionCuentaPasswordComponent,
    ActivacionCuentaComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule, ReactiveFormsModule],
})
export class AuthModule {}
