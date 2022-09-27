import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiteriaCardComponent } from './components/confiteria-card/confiteria-card.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { CombosComponent } from './pages/combos/combos.component';
import { CrispetasComponent } from './pages/crispetas/crispetas.component';
import { ConfiteriaRoutingModule } from './confiteria-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ConfiteriaOpcionCardComponent } from './components/confiteria-opcion-card/confiteria-opcion-card.component';

@NgModule({
  declarations: [
    ConfiteriaCardComponent,
    ListadoComponent,
    CombosComponent,
    CrispetasComponent,
    ConfiteriaOpcionCardComponent,
  ],
  imports: [CommonModule, ConfiteriaRoutingModule, SharedModule, FormsModule],
})
export class ConfiteriaModule {}
