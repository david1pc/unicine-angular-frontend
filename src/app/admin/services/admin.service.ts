import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import {
  AdministradorTeatro,
  Combo,
  ComboFile,
  Confiteria,
  ConfiteriaFile,
  Cupon,
  Imagen,
  Pelicula,
  PeliculaFile,
  ResultadoAdminsTeatro,
  ResultadoCombos,
  ResultadoConfiteria,
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

    let file: File = pelicula.imagenFile;

    if (!file) {
      file = new File([], '');
    }
    const fd = new FormData();
    fd.append('imagen', file);
    fd.append(
      'pelicula',
      new Blob([JSON.stringify(nueva)], {
        type: 'application/json',
      })
    );
    return this.http.post<Pelicula>(`${this.base_url}/admin/peliculas/`, fd);
  }

  editarPelicula(pelicula: PeliculaFile): Observable<Pelicula> {
    let nueva: Pelicula = {
      codigo: pelicula.codigo,
      nombre: pelicula.nombre,
      genero: pelicula.genero,
      estado: pelicula.estado,
      reparto: pelicula.reparto,
      sinopsis: pelicula.sinopsis,
      imagen: pelicula.imagen,
      url_trailer: pelicula.url_trailer,
      funciones: pelicula.funciones,
    };

    let file: File = pelicula.imagenFile;

    if (!file) {
      file = new File([], '');
    }

    const fd = new FormData();
    fd.append('imagen', file);
    fd.append(
      'pelicula',
      new Blob([JSON.stringify(nueva)], {
        type: 'application/json',
      })
    );
    return this.http.put<Pelicula>(`${this.base_url}/admin/peliculas/`, fd);
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

  listarAdminTeatros(): Observable<ResultadoAdminsTeatro> {
    return this.http.get<ResultadoAdminsTeatro>(
      `${this.base_url}/admin/teatro`
    );
  }

  agregarAdminTeatro(adminTeatro: AdministradorTeatro): Observable<any> {
    let nuevoAdminTeatro: AdministradorTeatro = {
      codigo: 0,
      primerApellido: adminTeatro.primerApellido,
      primerNombre: adminTeatro.primerNombre,
      segundoApellido: adminTeatro.segundoApellido,
      segundoNombre: adminTeatro.segundoNombre,
      correo: adminTeatro.correo,
      password: adminTeatro.password,
      rol: adminTeatro.rol,
      teatros: [],
      username: adminTeatro.username,
    };
    return this.http.post<any>(
      `${this.base_url}/admin/teatro`,
      nuevoAdminTeatro
    );
  }

  editarAdminTeatro(adminTeatro: AdministradorTeatro): Observable<any> {
    let nuevoAdminTeatro: AdministradorTeatro = {
      codigo: adminTeatro.codigo,
      primerApellido: adminTeatro.primerApellido,
      primerNombre: adminTeatro.primerNombre,
      segundoApellido: adminTeatro.segundoApellido,
      segundoNombre: adminTeatro.segundoNombre,
      correo: adminTeatro.correo,
      password: adminTeatro.password,
      rol: adminTeatro.rol,
      teatros: [],
      username: adminTeatro.username,
    };
    return this.http.put<any>(
      `${this.base_url}/admin/teatro`,
      nuevoAdminTeatro
    );
  }

  eliminarAdminTeatro(admins_ids: number[]): Observable<any> {
    return this.http.post<any>(
      `${this.base_url}/admin/teatro/eliminar`,
      admins_ids
    );
  }

  listarConfiterias(): Observable<ResultadoConfiteria> {
    return this.http.get<ResultadoConfiteria>(
      `${this.base_url}/admin/confiteria`
    );
  }

  agregarConfiteria(confiteria: ConfiteriaFile) {
    let imagen_d!: Imagen;
    let confiteria_nueva: Confiteria = {
      codigo: 0,
      descripcion: confiteria.descripcion,
      imagen: imagen_d,
      nombre: confiteria.nombre,
      precio: confiteria.precio,
      compraConfiterias: [],
    };

    let file: File = confiteria.imagenFile;
    if (!file) {
      file = new File([], '');
    }
    const fd = new FormData();
    fd.append('imagen', file);
    fd.append(
      'confiteria',
      new Blob([JSON.stringify(confiteria_nueva)], {
        type: 'application/json',
      })
    );
    return this.http.post<Confiteria>(`${this.base_url}/admin/confiteria/`, fd);
  }

  editarConfiteria(confiteria: ConfiteriaFile): Observable<Confiteria> {
    let nueva: Confiteria = {
      codigo: confiteria.codigo,
      nombre: confiteria.nombre,
      descripcion: confiteria.descripcion,
      precio: confiteria.precio,
      imagen: confiteria.imagen,
      compraConfiterias: confiteria.compraConfiterias,
    };

    let file: File = confiteria.imagenFile;

    if (!file) {
      file = new File([], '');
    }

    const fd = new FormData();
    fd.append('imagen', file);
    fd.append(
      'confiteria',
      new Blob([JSON.stringify(nueva)], {
        type: 'application/json',
      })
    );

    return this.http.put<Confiteria>(`${this.base_url}/admin/confiteria/`, fd);
  }

  eliminarConfiteria(ids_confiterias: number[]): Observable<any> {
    return this.http.post<any>(
      `${this.base_url}/admin/confiteria/eliminar`,
      ids_confiterias
    );
  }

  listarCombos(): Observable<ResultadoCombos> {
    return this.http.get<ResultadoCombos>(`${this.base_url}/admin/combos`);
  }

  agregarCombo(combo: ComboFile) {
    let imagen_d!: Imagen;
    let combo_nuevo: Combo = {
      codigo: 0,
      descripcion: combo.descripcion,
      imagen: imagen_d,
      nombre: combo.nombre,
      precio: combo.precio,
      compraCombos: [],
    };

    let file: File = combo.imagenFile;
    if (!file) {
      file = new File([], '');
    }
    const fd = new FormData();
    fd.append('imagen', file);
    fd.append(
      'combo',
      new Blob([JSON.stringify(combo_nuevo)], {
        type: 'application/json',
      })
    );
    return this.http.post<Confiteria>(`${this.base_url}/admin/combos/`, fd);
  }

  editarCombo(combo: ComboFile) {
    let nuevo: Combo = {
      codigo: combo.codigo,
      nombre: combo.nombre,
      descripcion: combo.descripcion,
      precio: combo.precio,
      imagen: combo.imagen,
      compraCombos: combo.compraCombos,
    };

    let file: File = combo.imagenFile;

    if (!file) {
      file = new File([], '');
    }

    const fd = new FormData();
    fd.append('imagen', file);
    fd.append(
      'combo',
      new Blob([JSON.stringify(nuevo)], {
        type: 'application/json',
      })
    );

    return this.http.put<Confiteria>(`${this.base_url}/admin/combos/`, fd);
  }

  eliminarCombo(combos_ids: number[]) {
    return this.http.post<any>(
      `${this.base_url}/admin/combos/eliminar`,
      combos_ids
    );
  }
}
