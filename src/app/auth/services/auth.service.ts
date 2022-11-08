import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente, Login, LoginUser } from '../interfaces/cliente.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base_url: string = environment.baseApiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  crearCliente(cliente: Cliente): Observable<LoginUser> {
    if (cliente.imagen) {
      let file: File = cliente.imagen;
      const fd = new FormData();
      fd.append('imagen', file);
      fd.append(
        'cliente',
        new Blob([JSON.stringify(cliente)], {
          type: 'application/json',
        })
      );
      return this.http.post<LoginUser>(
        `${this.base_url}/clientes/registro/`,
        fd
      );
    } else {
      return this.http.post<LoginUser>(
        `${this.base_url}/clientes/registro-data/`,
        cliente
      );
    }
  }

  iniciar_sesion(login: Login): Observable<LoginUser> {
    return this.http
      .post<LoginUser>(`${this.base_url}/clientes/login/`, login)
      .pipe(
        map((resp: LoginUser) => {
          localStorage.setItem('token', resp.login.jwttoken);
          localStorage.setItem('username', resp.login.username);
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
