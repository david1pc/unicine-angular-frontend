import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Compra,
  Funcion,
  Horario,
  Pelicula,
  ResultadoCombos,
  ResultadoConfiteria,
} from 'src/app/admin/interfaces/admin.interface';
import { environment } from 'src/environments/environment';

const pelicula = {} as Pelicula;
const funcion = {} as Funcion;
const compra = {} as Compra;

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private baseUrlApp: string = environment.baseApiUrl;
  private sourcePelicula = new BehaviorSubject<Pelicula>(pelicula);
  ultimaSeleccionPelicula = this.sourcePelicula.asObservable();
  private sourceFuncion = new BehaviorSubject<Funcion>(funcion);
  ultimaSeleccionFuncion = this.sourceFuncion.asObservable();
  private sourceCompra = new BehaviorSubject<Compra>(compra);
  ultimaSeleccionCompra = this.sourceFuncion.asObservable();

  cambiarPelicula(seleccion: Pelicula) {
    this.sourcePelicula.next(seleccion);
  }

  cambiarCompra(seleccion: Compra) {
    this.sourceCompra.next(seleccion);
  }

  cambiarFuncion(seleccion: Funcion) {
    this.sourceFuncion.next(seleccion);
  }

  constructor(private http: HttpClient) {}

  listarFunciones(idCiudad: number, idTeatro: number): Observable<any> {
    if (idCiudad && idTeatro == 0) {
      return this.http.get<any>(
        `${this.baseUrlApp}/clientes/funciones/${idCiudad}`
      );
    } else {
      return this.http.get<any>(
        `${this.baseUrlApp}/clientes/funciones/${idCiudad}/${idTeatro}`
      );
    }
  }

  listarFuncionesPeliculas(
    idCiudad: number,
    idPelicula: number,
    fecha: Date,
    dia: string
  ): Observable<any> {
    let h: Date = new Date();
    let a = new Date(h.toTimeString());
    let obj: Horario = {
      dia: dia,
      fecha_inicio: fecha,
      codigo: 0,
      fecha_fin: fecha,
      hora: a,
    };

    return this.http.post<any>(
      `${this.baseUrlApp}/clientes/funcion/${idCiudad}/${idPelicula}`,
      obj
    );
  }

  listarPeliculas(idCiudad: number, idTeatro: number) {
    if (idCiudad && idTeatro == 0) {
      return this.http.get<any>(
        `${this.baseUrlApp}/clientes/peliculas/${idCiudad}`
      );
    } else {
      return this.http.get<any>(
        `${this.baseUrlApp}/clientes/peliculas/${idCiudad}/${idTeatro}`
      );
    }
  }

  listarConfiterias(): Observable<ResultadoConfiteria> {
    return this.http.get<ResultadoConfiteria>(
      `${this.baseUrlApp}/clientes/confiteria`
    );
  }

  listarCombos(): Observable<ResultadoCombos> {
    return this.http.get<ResultadoCombos>(`${this.baseUrlApp}/clientes/combos`);
  }
}
