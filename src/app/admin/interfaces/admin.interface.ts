import { Cliente, Rol } from 'src/app/auth/interfaces/cliente.interface';

export interface ResultadoPeliculas {
  peliculas: Pelicula[];
}

export interface ResultadoCupones {
  cupones: Cupon[];
}

export interface ResultadoSalas {
  salas: Sala[];
}

export interface ResultadoAdminsTeatro {
  administradorTeatro: AdministradorTeatro[];
}

export interface ResultadoConfiteria {
  confiterias: Confiteria[];
}

export interface ResultadoTeatros {
  teatros: Teatro[];
}

export interface ResultadoCiudades {
  ciudades: Ciudad[];
}

export interface ResultadoCombos {
  combos: Combo[];
}

export interface ResultadoHorarios {
  horarios: Horario[];
}

export interface ResultadoFunciones {
  funciones: Funcion[];
}

export interface Horario {
  codigo: number;
  hora: Date;
  dia: string;
  fecha_inicio: Date;
  fecha_fin: Date;
}

export interface AdministradorTeatro {
  codigo: number;
  primerNombre: string;
  segundoNombre: null;
  primerApellido: string;
  segundoApellido: null;
  correo: string;
  username: string;
  password: string;
  teatros: Teatro[];
  rol: Rol;
}

export interface Teatro {
  codigo: number;
  direccion: string;
  telefono: string;
  administradorTeatro?: AdministradorTeatro;
  salas: Sala[];
  ciudad: Ciudad;
}

export interface Sala {
  codigo: number;
  nombre: string;
  distribucionSillas: DistribucionSillas;
  teatro: Teatro;
  funciones?: Funcion[];
}

export interface DistribucionSillas {
  codigo: number;
  esquema: string;
  total_sillas: number;
  filas: number;
  columnas: number;
}

export interface Ciudad {
  codigo: number;
  nombre: string;
}

export interface Combo {
  codigo: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: Imagen;
  compraCombos?: CompraCombo[];
}

export interface ComboFile {
  codigo: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: Imagen;
  imagenFile: File;
  compraCombos?: CompraCombo[];
}

export interface Pelicula {
  codigo: number;
  nombre: string;
  sinopsis: string;
  url_trailer: string;
  imagen: Imagen;
  genero: Genero;
  estado: boolean;
  reparto: string;
  funciones?: Funcion[];
}

export interface Dialog {
  titulo: string;
  descripcion: string;
  estado: boolean;
  icono: string;
}

export interface PeliculaFile {
  codigo: number;
  nombre: string;
  sinopsis: string;
  imagen: Imagen;
  imagenFile: File;
  url_trailer: string;
  genero: Genero;
  estado: boolean;
  reparto: string;
  funciones?: Funcion[];
}

export interface Imagen {
  codigo: number;
  nombre: string;
  imagenUrl: string;
  imagenId: string;
}

export interface Funcion {
  codigo: number;
  precio: number;
  sala: Sala;
  horario: Horario;
  pelicula: Pelicula;
  compras?: Compra[];
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

export interface Entrada {
  codigo: number;
  precio: number;
  fila: string;
  columna: number;
}

export interface Confiteria {
  codigo: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: Imagen;
  compraConfiterias?: CompraConfiteria[];
}

export interface ConfiteriaFile {
  codigo: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: Imagen;
  imagenFile: File;
  compraConfiterias?: CompraConfiteria[];
}

export interface Cupon {
  codigo: number;
  descripcion: string;
  descuento: number;
  criterio: string;
  vencimiento: Date;
  cuponClientes: CuponCliente[];
}

export interface CuponCliente {
  codigo?: number;
  estado: boolean;
  cupon: Cupon;
  cliente: Cliente;
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
