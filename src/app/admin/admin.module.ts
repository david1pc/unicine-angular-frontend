import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { ListadoPeliculasComponent } from './pages/listado-peliculas/listado-peliculas.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CuponesComponent } from './pages/cupones/cupones.component';
import { AgregarPeliculaComponent } from './components/agregar-pelicula/agregar-pelicula.component';
import { EliminarPeliculaComponent } from './components/eliminar-pelicula/eliminar-pelicula.component';

@NgModule({
  declarations: [
    HomeComponent,
    ListadoPeliculasComponent,
    CuponesComponent,
    AgregarPeliculaComponent,
    EliminarPeliculaComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AdminModule {}