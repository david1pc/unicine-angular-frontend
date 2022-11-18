import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imagen } from 'src/app/admin/interfaces/admin.interface';
import {
  Cliente,
  ClienteFile,
} from 'src/app/auth/interfaces/cliente.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteServiceService {
  base_url = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  obtener_cliente(username: string): Observable<any> {
    return this.http.get<any>(`${this.base_url}/clientes/${username}`);
  }

  actualizarCliente(cliente: ClienteFile): Observable<any> {
    let nuevo: Cliente = {
      cedula: cliente.cedula,
      codigo: cliente.codigo!,
      correo: cliente.correo,
      estado: cliente.estado,
      imagen: cliente.imagen,
      password: cliente.password,
      primerApellido: cliente.primerApellido,
      primerNombre: cliente.primerNombre,
      rol: cliente.rol,
      username: cliente.username,
      compras: [],
      cuponClientes: [],
      segundoApellido: cliente.segundoApellido,
      segundoNombre: cliente.segundoNombre,
      telefonos: cliente.telefonos,
    };

    console.log(nuevo);

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

    return this.http.put<any>(`${this.base_url}/clientes/actualizacion/`, fd);
  }
}
