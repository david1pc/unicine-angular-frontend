import { Cupon, Imagen } from 'src/app/admin/interfaces/admin.interface';

export interface Cliente {
  codigo: number;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  correo: string;
  username: string;
  password: string;
  cedula: string;
  estado: boolean;
  telefonos?: string[];
  imagen: Imagen;
  compras?: Compra[];
  cuponClientes?: CuponCliente[];
  rol: Rol;
}

export interface ClienteFile {
  codigo?: number;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  correo: string;
  username: string;
  password: string;
  cedula: string;
  estado: boolean;
  telefonos?: string[];
  imagen: Imagen;
  imagenFile: File;
  compras?: Compra[];
  cuponClientes?: CuponCliente[];
  rol: Rol;
}

export interface LoginUser {
  mensaje: string;
  login: TokenUser;
}

export interface TokenUser {
  jwttoken: string;
  username: string;
  rol: string;
}

export interface Rol {
  codigo?: number;
  nombre: string;
}

export interface Compra {
  codigo: number;
  medioPago: string;
  fecha_compra: Date;
  valor_total: number;
  entradas: Entrada[];
  compraConfiterias: CompraConfiteria[];
  compraCombos: CompraConfiteria[];
}

export interface Entrada {
  codigo: number;
  precio: number;
  fila: string;
  columna: number;
}

export interface CompraConfiteria {
  codigo: number;
  cantidad: number;
  precio: number;
}

export interface CuponCliente {
  codigo: number;
  estado: boolean;
  cupon: Cupon;
  cliente: Cliente;
}

export interface Usuario {
  auth: Auth;
}

export interface Auth {
  codigo: number;
  correo: string;
  rol: string;
}

export interface Login {
  username: string;
  password: string;
}

export enum rol {
  ADMINISTRADOR = 'ADMINISTRADOR',
  ADMINISTRADOR_TEATRO = 'ADMINISTRADOR_TEATRO',
  CLIENTE = 'CLIENTE',
}
