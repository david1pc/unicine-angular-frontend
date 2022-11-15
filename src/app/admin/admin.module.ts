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
import { EliminarTeatroComponent } from './components/eliminar-teatro/eliminar-teatro.component';
import { CombosComponent } from './pages/combos/combos.component';
import { AgregarComboComponent } from './components/agregar-combo/agregar-combo.component';
import { EliminarComboComponent } from './components/eliminar-combo/eliminar-combo.component';
import { SalasComponent } from './pages/salas/salas.component';
import { AgregarSalaComponent } from './components/agregar-sala/agregar-sala.component';
import { EliminarSalaComponent } from './components/eliminar-sala/eliminar-sala.component';
import { DistribucionesSillasComponent } from './pages/distribuciones-sillas/distribuciones-sillas.component';
import { AgregarDistribucionSillaComponent } from './components/agregar-distribucion-silla/agregar-distribucion-silla.component';
import { EliminarDistribucionSillasComponent } from './components/eliminar-distribucion-sillas/eliminar-distribucion-sillas.component';
import { HorariosComponent } from './pages/horarios/horarios.component';
import { AgregarHorarioComponent } from './components/agregar-horario/agregar-horario.component';
import { EliminarHorarioComponent } from './components/eliminar-horario/eliminar-horario.component';
import { FuncionesComponent } from './pages/funciones/funciones.component';
import { AgregarFuncionComponent } from './components/agregar-funcion/agregar-funcion.component';
import { EliminarFuncionComponent } from './components/eliminar-funcion/eliminar-funcion.component';

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
    EliminarTeatroComponent,
    CombosComponent,
    AgregarComboComponent,
    EliminarComboComponent,
    SalasComponent,
    AgregarSalaComponent,
    EliminarSalaComponent,
    DistribucionesSillasComponent,
    AgregarDistribucionSillaComponent,
    EliminarDistribucionSillasComponent,
    HorariosComponent,
    AgregarHorarioComponent,
    EliminarHorarioComponent,
    FuncionesComponent,
    AgregarFuncionComponent,
    EliminarFuncionComponent,
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
