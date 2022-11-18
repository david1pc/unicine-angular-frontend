import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './pages/principal/principal.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SharedModule } from '../shared/shared.module';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ComprasComponent } from './components/compras/compras.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PrincipalComponent, PerfilComponent, ComprasComponent],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ClienteModule {}
