import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import {
  Compra,
  CuponCliente,
  Entrada,
  Entrada2,
  Funcion,
  Horario,
  NuevaCompra,
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
  ultimaSeleccionCompra = this.sourceCompra.asObservable();
  contenido!: string;

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

  redimirCupon(codigoCupon: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrlApp}/clientes/cupon/${codigoCupon}`
    );
  }

  registrarCompra(
    compra: Compra,
    contenido: string,
    cuponCliente: CuponCliente
  ): Observable<any> {
    let username = localStorage.getItem('username') || '';
    let nueva_compra: NuevaCompra = {
      codigo: 0,
      compraCombos: compra.compraCombo,
      compraConfiterias: compra.compraConfiteria,
      contenido: contenido,
      entradas: compra.entradas,
      fecha_compra: compra.fecha_compra,
      funcion: compra.funcion,
      medioPago: compra.medioPago,
      cuponCliente: cuponCliente,
      username: username,
      valor_total: compra.valor_total,
    };

    console.log(nueva_compra);

    return this.http.post<any>(
      `${this.baseUrlApp}/clientes/compras/`,
      nueva_compra
    );
  }

  generarCodigoQREntrada(entradas: Entrada[]) {
    return this.http
      .post<any>(`${this.baseUrlApp}/clientes/entradas/`, entradas)
      .pipe(
        map((e) => {
          return e.barcode;
        })
      );
  }
}
