import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { PeliculaCardComponent } from './components/pelicula-card/pelicula-card.component';
import { PeliculasRoutingModule } from './peliculas-routing.module';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { SharedModule } from '../shared/shared.module';
import { CarteleraPeliculaCardComponent } from './components/cartelera-pelicula-card/cartelera-pelicula-card.component';
import { SliderComponent } from './components/slider/slider.component';
import { NgBootstrapModule } from '../ng-bootstrap/ng-bootstrap.module';
import { NgImageSliderModule } from 'ng-image-slider';
import { FuncionModalComponent } from './components/funcion-modal/funcion-modal.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { CompraComponent } from './pages/compra/compra.component';
import { SillasComponent } from './pages/sillas/sillas.component';

@NgModule({
  declarations: [
    ListadoComponent,
    PeliculaCardComponent,
    PeliculaComponent,
    CarteleraPeliculaCardComponent,
    SliderComponent,
    FuncionModalComponent,
    CompraComponent,
    SillasComponent,
  ],
  imports: [
    CommonModule,
    PeliculasRoutingModule,
    SharedModule,
    FormsModule,
    NgBootstrapModule,
    NgImageSliderModule,
    MaterialModule,
  ],
})
export class PeliculasModule {}
