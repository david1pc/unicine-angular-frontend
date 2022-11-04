export interface Cliente {
  codigo?: number;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  correo: string;
  password: string;
  cedula: string;
  estado: boolean;
  telefonos?: string[];
  imagen_perfil?: string;
  compras?: Compra[];
  cuponClientes?: CuponCliente[];
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

export interface Cupon {
  codigo: number;
  descripcion: string;
  descuento: number;
  criterio: string;
  vencimiento: Date;
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
  correo: string;
  password: string;
}

export enum rol {
  ADMINISTRADOR = 'ADMINISTRADOR',
  ADMINISTRADOR_TEATRO = 'ADMINISTRADOR_TEATRO',
  CLIENTE = 'CLIENTE',
}
