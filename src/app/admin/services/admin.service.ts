import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pelicula, ResultadoPeliculas } from '../interfaces/admin.interface';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private base_url: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  listarPeliculas(): Observable<ResultadoPeliculas> {
    return this.http.get<ResultadoPeliculas>(
      `${this.base_url}/admin/peliculas/`
    );
  }

  agregarPelicula(pelicula: Pelicula): Observable<Pelicula> {
    let nueva: Pelicula = {
      codigo: 0,
      nombre: pelicula.nombre,
      genero: pelicula.genero,
      estado: false,
      reparto: pelicula.reparto,
      sinopsis: pelicula.sinopsis,
      url_img: pelicula.url_img,
      url_trailer: pelicula.url_trailer,
      funciones: [],
    };
    return this.http.post<Pelicula>(`${this.base_url}/admin/peliculas/`, nueva);
  }

  editarPelicula(pelicula: Pelicula): Observable<Pelicula> {
    let nueva: Pelicula = {
      codigo: pelicula.codigo,
      nombre: pelicula.nombre,
      genero: pelicula.genero,
      estado: pelicula.estado,
      reparto: pelicula.reparto,
      sinopsis: pelicula.sinopsis,
      url_img: pelicula.url_img,
      url_trailer: pelicula.url_trailer,
      funciones: pelicula.funciones,
    };
    return this.http.put<Pelicula>(`${this.base_url}/admin/peliculas/`, nueva);
  }

  eliminarPelicula(peliculas_id: number[]): Observable<any> {
    return this.http.post<any>(
      `${this.base_url}/admin/peliculas/eliminar`,
      peliculas_id
    );
  }
}
