import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Resultado } from '../interfaces/peliculas.interface';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  /* private baseUrl: string = environment.baseUrl;
  private api_key: string = environment.api_key; */

  private baseUrl: string = 'https://api.themoviedb.org/3/';
  private api_key: string = '9af7c3e98256cd3e635bd205baed2aff';

  constructor(private http: HttpClient) {}

  getPeliculas(): Observable<Resultado> {
    return this.http.get<Resultado>(
      `${this.baseUrl}movie/popular?api_key=${this.api_key}`
    );
  }

  getPeliculasPreventa(): Observable<Resultado> {
    return this.http.get<Resultado>(
      `${this.baseUrl}movie/upcoming?api_key=${this.api_key}`
    );
  }
}
