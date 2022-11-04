import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Auth,
  Cliente,
  Login,
  rol,
  Usuario,
} from '../interfaces/cliente.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base_url: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  crearCliente(cliente: Cliente): Observable<Object> {
    return this.http.post<Object>(`${this.base_url}/clientes/`, cliente);
  }

  auth!: Auth | undefined;

  get Auth() {
    return { ...this.auth };
  }

  verificaAutenticacion(): Observable<boolean> {
    const rol_str: string = String(localStorage.getItem('rol'));
    if (
      !localStorage.getItem('token') ||
      !localStorage.getItem('correo') ||
      rol_str == rol.CLIENTE
    ) {
      return of(false);
    }

    let rol_user!: rol;

    if (rol_str === rol.ADMINISTRADOR) {
      rol_user = rol.ADMINISTRADOR;
    } else if (rol_str === rol.ADMINISTRADOR_TEATRO) {
      rol_user = rol.ADMINISTRADOR_TEATRO;
    }

    const autha: Auth = {
      codigo: Number(localStorage.getItem('token')),
      correo: String(localStorage.getItem('correo')),
      rol: rol_user,
    };

    this.auth = autha;

    return this.http
      .post<Auth>(`${this.base_url}/clientes/verificar-usuario/`, this.Auth)
      .pipe(
        map((auth) => {
          this.auth = auth;
          return true;
        })
      );
  }

  login(login: Login) {
    return this.http
      .post<Usuario>(`${this.base_url}/clientes/login/`, login)
      .pipe(
        tap((usuario) => {
          localStorage.setItem('correo', usuario.auth.correo);
          localStorage.setItem('token', String(usuario.auth.codigo));
          localStorage.setItem('rol', usuario.auth.rol);
        })
      );
  }

  logout() {
    this.auth = undefined;
    localStorage.clear();
  }
}
