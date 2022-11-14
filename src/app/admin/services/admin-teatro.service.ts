import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ResultadoCiudades,
  ResultadoTeatros,
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
}
