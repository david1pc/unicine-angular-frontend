import { Ciudad, Teatro } from 'src/app/admin/interfaces/admin.interface';

export interface Resultado {
  page: number;
  peliculas: Pelicula[];
  total_pages: number;
  total_results: number;
}

export interface Pelicula {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface BusquedaFunciones {
  ciudad: Ciudad;
  teatro: Teatro;
}
