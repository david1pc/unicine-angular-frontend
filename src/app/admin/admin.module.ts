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
import { AgregarCuponComponent } from './components/agregar-cupon/agregar-cupon.component';
import { EliminarCuponComponent } from './components/eliminar-cupon/eliminar-cupon.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AdminTeatroComponent } from './pages/admin-teatro/admin-teatro.component';
import { AgregarAdminTeatroComponent } from './components/agregar-admin-teatro/agregar-admin-teatro.component';
import { EliminarAdminTeatroComponent } from './components/eliminar-admin-teatro/eliminar-admin-teatro.component';
import { ConfiteriaComponent } from './pages/confiteria/confiteria.component';
import { AgregarConfiteriaComponent } from './components/agregar-confiteria/agregar-confiteria.component';
import { EliminarConfiteriaComponent } from './components/eliminar-confiteria/eliminar-confiteria.component';
import { TeatrosComponent } from './pages/teatros/teatros.component';
import { AgregarTeatroComponent } from './components/agregar-teatro/agregar-teatro.component';

@NgModule({
  declarations: [
    HomeComponent,
    ListadoPeliculasComponent,
    CuponesComponent,
    AgregarPeliculaComponent,
    EliminarPeliculaComponent,
    AgregarCuponComponent,
    EliminarCuponComponent,
    DialogComponent,
    AdminTeatroComponent,
    AgregarAdminTeatroComponent,
    EliminarAdminTeatroComponent,
    ConfiteriaComponent,
    AgregarConfiteriaComponent,
    EliminarConfiteriaComponent,
    TeatrosComponent,
    AgregarTeatroComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [DialogComponent],
})
export class AdminModule {}
