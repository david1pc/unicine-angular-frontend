import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { PeliculaCardComponent } from './components/pelicula-card/pelicula-card.component';
import { PeliculasRoutingModule } from './peliculas-routing.module';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { SharedModule } from '../shared/shared.module';
import { CarteleraPeliculaCardComponent } from './components/cartelera-pelicula-card/cartelera-pelicula-card.component';
import { SliderComponent } from './components/slider/slider.component';

@NgModule({
  declarations: [
    ListadoComponent,
    PeliculaCardComponent,
    PeliculaComponent,
    CarteleraPeliculaCardComponent,
    SliderComponent,
  ],
  imports: [CommonModule, PeliculasRoutingModule, SharedModule],
})
export class PeliculasModule {}
