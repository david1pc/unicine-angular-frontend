import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RecuperacionCuentaCorreoComponent } from './pages/recuperacion-cuenta-correo/recuperacion-cuenta-correo.component';
import { RecuperacionCuentaPasswordComponent } from './pages/recuperacion-cuenta-password/recuperacion-cuenta-password.component';

@NgModule({
  declarations: [LoginComponent, RegistroComponent, RecuperacionCuentaCorreoComponent, RecuperacionCuentaPasswordComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
