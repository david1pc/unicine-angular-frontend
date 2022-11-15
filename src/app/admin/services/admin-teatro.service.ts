import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  DistribucionSillas,
  Funcion,
  Horario,
  ResultadoCiudades,
  ResultadoSalas,
  ResultadoTeatros,
  Sala,
  Teatro,
} from '../interfaces/admin.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminTeatroService {
  private base_url: string = environment.baseApiUrl;
  private source = new BehaviorSubject<number>(0);
  ultimaSeleccion = this.source.asObservable();
  private sourceTeatro = new BehaviorSubject<Teatro>({
    ciudad: {
      codigo: 0,
      nombre: '',
    },
    codigo: 0,
    direccion: '',
    salas: [],
    telefono: '',
  });
  editarTeatro = this.sourceTeatro.asObservable();

  constructor(private http: HttpClient) {}

  cambiarSeleccion(seleccion: number) {
    this.source.next(seleccion);
  }

  cambiarEdicionTeatro(seleccion: Teatro) {
    this.sourceTeatro.next(seleccion);
  }

  listarTeatros(): Observable<ResultadoTeatros> {
    return this.http.get<ResultadoTeatros>(
      `${this.base_url}/admin-teatro/teatro/`
    );
  }

  listarCiudades(): Observable<ResultadoCiudades> {
    return this.http.get<ResultadoCiudades>(
      `${this.base_url}/admin-teatro/ciudades/`
    );
  }

  agregarTeatro(teatro: Teatro): Observable<any> {
    return this.http.post<any>(`${this.base_url}/admin-teatro/teatro/`, teatro);
  }

  editarTeatroExistente(teatro: Teatro): Observable<any> {
    return this.http.put<any>(`${this.base_url}/admin-teatro/teatro/`, teatro);
  }

  eliminarTeatros(teatros_ids: number[]): Observable<any> {
    return this.http.post<any>(
      `${this.base_url}/admin-teatro/teatro/eliminar`,
      teatros_ids
    );
  }

  agregarSala(sala: Sala): Observable<any> {
    return this.http.post<any>(`${this.base_url}/admin-teatro/salas/`, sala);
  }

  editarSala(sala: Sala): Observable<any> {
    return this.http.put<any>(`${this.base_url}/admin-teatro/salas/`, sala);
  }

  eliminarSalas(salas_ids: number[]) {
    return this.http.post<any>(
      `${this.base_url}/admin-teatro/salas/eliminar`,
      salas_ids
    );
  }

  listarSalas(): Observable<ResultadoSalas> {
    return this.http.get<ResultadoSalas>(
      `${this.base_url}/admin-teatro/salas/`
    );
  }

  listarDistribucionSillas(): Observable<any> {
    return this.http.get<any>(`${this.base_url}/admin-teatro/distribucion/`);
  }

  agregarDistribucionSillas(
    distribucionSillas: DistribucionSillas
  ): Observable<any> {
    return this.http.post<any>(
      `${this.base_url}/admin-teatro/distribucion/`,
      distribucionSillas
    );
  }

  editarDistribucionSillas(
    distribucionSillas: DistribucionSillas
  ): Observable<any> {
    return this.http.put<any>(
      `${this.base_url}/admin-teatro/distribucion/`,
      distribucionSillas
    );
  }

  eliminarDistribucionSillas(distribuciones_ids: number[]) {
    return this.http.post<any>(
      `${this.base_url}/admin-teatro/distribucion/eliminar`,
      distribuciones_ids
    );
  }

  listarHorarios(): Observable<any> {
    return this.http.get<any>(`${this.base_url}/admin-teatro/horario/`);
  }

  agregarHorario(horario: Horario): Observable<any> {
    return this.http.post<any>(
      `${this.base_url}/admin-teatro/horario/`,
      horario
    );
  }

  editarHorario(horario: Horario): Observable<any> {
    return this.http.put<any>(
      `${this.base_url}/admin-teatro/horario/`,
      horario
    );
  }

  eliminarHorarios(horarios_ids: number[]) {
    return this.http.post<any>(
      `${this.base_url}/admin-teatro/horario/eliminar`,
      horarios_ids
    );
  }

  listarFunciones(): Observable<any> {
    return this.http.get<any>(`${this.base_url}/admin-teatro/funcion/`);
  }

  agregarFuncion(funcion: Funcion): Observable<any> {
    return this.http.post<any>(
      `${this.base_url}/admin-teatro/funcion/`,
      funcion
    );
  }

  editarFuncion(funcion: Funcion) {
    return this.http.put<any>(
      `${this.base_url}/admin-teatro/funcion/`,
      funcion
    );
  }

  eliminarFunciones(funciones_ids: number[]) {
    return this.http.post<any>(
      `${this.base_url}/admin-teatro/funcion/eliminar`,
      funciones_ids
    );
  }
}
