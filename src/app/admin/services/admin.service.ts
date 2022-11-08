import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import {
  Cupon,
  Imagen,
  Pelicula,
  PeliculaFile,
  ResultadoCupones,
  ResultadoPeliculas,
} from '../interfaces/admin.interface';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private base_url: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  listarPeliculas(): Observable<ResultadoPeliculas> {
    return this.http.get<ResultadoPeliculas>(
      `${this.base_url}/admin/peliculas/`
    );
  }

  agregarPelicula(pelicula: PeliculaFile): Observable<Pelicula> {
    let imagen_d!: Imagen;
    let nueva: Pelicula = {
      codigo: 0,
      nombre: pelicula.nombre,
      genero: pelicula.genero,
      estado: pelicula.estado,
      reparto: pelicula.reparto,
      sinopsis: pelicula.sinopsis,
      imagen: imagen_d,
      url_trailer: pelicula.url_trailer,
      funciones: [],
    };

    if (pelicula.imagenFile) {
      let file: File = pelicula.imagenFile;
      const fd = new FormData();
      fd.append('imagen', file);
      fd.append(
        'pelicula',
        new Blob([JSON.stringify(nueva)], {
          type: 'application/json',
        })
      );
      return this.http.post<Pelicula>(`${this.base_url}/admin/peliculas/`, fd);
    } else {
      return this.http.post<Pelicula>(
        `${this.base_url}/admin/peliculas-data/`,
        nueva
      );
    }
  }

  editarPelicula(pelicula: PeliculaFile): Observable<Pelicula> {
    let imagen_d: Imagen = {
      codigo: 0,
      imagenId: '',
      imagenUrl: '',
      nombre: '',
    };
    let nueva: Pelicula = {
      codigo: pelicula.codigo,
      nombre: pelicula.nombre,
      genero: pelicula.genero,
      estado: pelicula.estado,
      reparto: pelicula.reparto,
      sinopsis: pelicula.sinopsis,
      imagen: imagen_d,
      url_trailer: pelicula.url_trailer,
      funciones: pelicula.funciones,
    };

    if (pelicula.imagenFile) {
      let file: File = pelicula.imagenFile;
      nueva.imagen = pelicula.imagen;
      const fd = new FormData();
      fd.append('imagen', file);
      fd.append(
        'pelicula',
        new Blob([JSON.stringify(nueva)], {
          type: 'application/json',
        })
      );
      return this.http.put<Pelicula>(`${this.base_url}/admin/peliculas/`, fd);
    } else {
      nueva.imagen = pelicula.imagen;
      return this.http.put<Pelicula>(
        `${this.base_url}/admin/peliculas-data/`,
        nueva
      );
    }
  }

  eliminarPelicula(peliculas_id: number[]): Observable<any> {
    return this.http.post<any>(
      `${this.base_url}/admin/peliculas/eliminar`,
      peliculas_id
    );
  }

  listarCupones(): Observable<ResultadoCupones> {
    return this.http.get<ResultadoCupones>(`${this.base_url}/admin/cupones/`);
  }

  agregarCupon(cupon: Cupon): Observable<Cupon> {
    let nuevo: Cupon = {
      codigo: 0,
      descripcion: cupon.descripcion,
      criterio: cupon.criterio,
      descuento: cupon.descuento,
      vencimiento: cupon.vencimiento,
      cuponClientes: [],
    };
    return this.http.post<Cupon>(`${this.base_url}/admin/cupones/`, nuevo);
  }

  editarCupon(cupon: Cupon): Observable<Cupon> {
    let nuevo: Cupon = {
      codigo: cupon.codigo,
      descripcion: cupon.descripcion,
      criterio: cupon.criterio,
      descuento: cupon.descuento,
      vencimiento: cupon.vencimiento,
      cuponClientes: [],
    };
    return this.http.put<Cupon>(`${this.base_url}/admin/cupones/`, nuevo);
  }

  eliminarCupon(cupones_id: number[]): Observable<any> {
    return this.http.post<any>(
      `${this.base_url}/admin/cupones/eliminar`,
      cupones_id
    );
  }
}
