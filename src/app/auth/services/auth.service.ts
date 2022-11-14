import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Imagen } from 'src/app/admin/interfaces/admin.interface';
import { environment } from 'src/environments/environment';
import {
  Cliente,
  ClienteFile,
  Login,
  LoginUser,
} from '../interfaces/cliente.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base_url: string = environment.baseApiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  crearCliente(cliente: ClienteFile): Observable<LoginUser> {
    let imagen_d!: Imagen;
    let nuevo: Cliente = {
      codigo: 0,
      cedula: cliente.cedula,
      correo: cliente.correo,
      estado: cliente.estado,
      imagen: imagen_d,
      password: cliente.password,
      primerApellido: cliente.primerApellido,
      primerNombre: cliente.primerNombre,
      segundoApellido: cliente.segundoApellido,
      segundoNombre: cliente.segundoNombre,
      rol: cliente.rol,
      username: cliente.username,
      compras: [],
      cuponClientes: [],
      telefonos: [],
    };

    let file: File = cliente.imagenFile;

    if (!file) {
      file = new File([], '');
    }

    const fd = new FormData();
    fd.append('imagen', file);
    fd.append(
      'cliente',
      new Blob([JSON.stringify(nuevo)], {
        type: 'application/json',
      })
    );

    return this.http.post<LoginUser>(`${this.base_url}/clientes/registro/`, fd);
  }

  iniciar_sesion(login: Login): Observable<LoginUser> {
    return this.http
      .post<LoginUser>(`${this.base_url}/clientes/login/`, login)
      .pipe(
        map((resp: any) => {
          localStorage.setItem('token', resp.login.jwttoken);
          localStorage.setItem('username', resp.login.username);
          localStorage.setItem('rol', resp.login.rol);
          return resp;
        })
      );
  }

  activarCuenta(str: string | null): Observable<any> {
    return this.http.get<any>(
      `${this.base_url}/clientes/activacion-cuenta/${str}`
    );
  }

  logout() {
    localStorage.clear();
  }
}
