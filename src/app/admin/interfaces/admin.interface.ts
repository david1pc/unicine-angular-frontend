export interface ResultadoPeliculas {
  peliculas: Pelicula[];
}

export interface Pelicula {
  codigo: number;
  nombre: string;
  sinopsis: string;
  url_trailer: string;
  url_img: string;
  genero: Genero;
  estado: boolean;
  reparto: string;
  funciones?: Funcion[];
}

export interface Funcion {
  codigo: number;
  precio: number;
  compras: Compra[];
}

export interface Compra {
  codigo: number;
  medioPago: string;
  fecha_compra: Date;
  valor_total: number;
  entradas: Entrada[];
  compraConfiterias: CompraConfiteria[];
  compraCombos: CompraCombo[];
}

export interface CompraConfiteria {
  codigo: number;
  cantidad: number;
  precio: number;
}

export interface CompraCombo {
  codigo: number;
  cantidad: number;
  precio: number;
  compra: Compra;
  combo: Combo;
}

export interface Combo {
  codigo: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
}

export interface Entrada {
  codigo: number;
  precio: number;
  fila: string;
  columna: number;
}

export enum Genero {
  ACCION,
  COMEDIA,
  ROMANCE,
  CIENCIA_FICCION,
  ANIMADA,
  DRAMA,
  TERROR,
}
