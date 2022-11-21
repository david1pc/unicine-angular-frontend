import { Component, OnInit } from '@angular/core';
import {
  Combo,
  Compra,
  CompraCombo,
  CompraConfiteria,
  Confiteria,
  Entrada,
  Funcion,
} from 'src/app/admin/interfaces/admin.interface';
import Swal from 'sweetalert2';
import { PeliculasService } from '../../services/peliculas.service';

export interface confiteriaTotal {
  codigo: number;
  cantidad: number;
  total: number;
  index: number;
}

export interface CompraDetalle {
  confiteriaTotal: confiteriaTotal[];
  confiteriaTotalCombos: confiteriaTotal[];
  cantidadEntradas: number;
  totalEntradas: number;
  totalCompraCombos: number;
  totalCompraConfiterias: number;
  totalCompra: number;
}

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css'],
})
export class CompraComponent implements OnInit {
  confiterias!: Confiteria[];
  combos!: Combo[];
  confiteriaTotal: confiteriaTotal[] = [];
  confiteriaTotalCombos: confiteriaTotal[] = [];
  funcion!: Funcion;
  cantidadEntradas!: number;
  totalEntradas: number = 0;
  totalCompraCombos: number = 0;
  totalCompraConfiterias: number = 0;
  totalCompra: number = 0;
  compraCombos: CompraCombo[] = [];
  compraConfiteria: CompraConfiteria[] = [];
  entradas: Entrada[] = [];

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    this.peliculasService.ultimaSeleccionFuncion.subscribe((f) => {
      if (f == null || f == undefined || Object.keys(f).length === 0) {
        let funcionLocal =
          localStorage.getItem('funcion') !== null
            ? JSON.parse(localStorage.getItem('funcion')!)
            : [];
        this.funcion = funcionLocal;
      } else {
        this.funcion = f;
      }
    });

    let compra_detalle =
      localStorage.getItem('compra_detalle') !== null
        ? JSON.parse(localStorage.getItem('compra_detalle')!)
        : [];

    if (Object.keys(compra_detalle).length !== 0) {
      this.asignarCompraDetalle(compra_detalle);

      this.peliculasService.listarConfiterias().subscribe((result) => {
        this.confiterias = result.confiterias;
      });

      this.peliculasService.listarCombos().subscribe((result) => {
        this.combos = result.combos;
      });
    } else {
      this.peliculasService.listarConfiterias().subscribe((result) => {
        this.confiterias = result.confiterias;
        for (let i = 0; i < this.confiterias.length; i++) {
          this.confiteriaTotal.push({
            codigo: this.confiterias[i].codigo,
            total: 0.0,
            cantidad: 0,
            index: i,
          });
        }
      });

      this.peliculasService.listarCombos().subscribe((result) => {
        this.combos = result.combos;
        for (let i = 0; i < this.combos.length; i++) {
          this.confiteriaTotalCombos.push({
            codigo: this.combos[i].codigo,
            total: 0.0,
            cantidad: 0,
            index: i,
          });
        }
      });
    }
  }

  cambiarTotal(confiteria: Confiteria, index: number) {
    if (this.confiteriaTotal[index].total > 0) {
      this.totalCompraConfiterias -= this.confiteriaTotal[index].total;
      this.totalCompra -= this.confiteriaTotal[index].total;
    }
    this.confiteriaTotal[index].total = 0;
    this.confiteriaTotal[index].total =
      confiteria.precio * this.confiteriaTotal[index].cantidad;
    this.totalCompraConfiterias += this.confiteriaTotal[index].total;
    this.totalCompra += this.confiteriaTotal[index].total;
  }

  cambiarTotalCombos(combo: Combo, index: number) {
    if (this.confiteriaTotalCombos[index].total > 0) {
      this.totalCompraCombos -= this.confiteriaTotalCombos[index].total;
      this.totalCompra -= this.confiteriaTotalCombos[index].total;
    }
    this.confiteriaTotalCombos[index].total = 0;
    this.confiteriaTotalCombos[index].total =
      combo.precio * this.confiteriaTotalCombos[index].cantidad;
    this.totalCompraCombos += this.confiteriaTotalCombos[index].total;
    this.totalCompra += this.confiteriaTotalCombos[index].total;
  }

  cambiarTotalEntradas() {
    if (
      this.cantidadEntradas <= this.funcion.sala.distribucionSillas.total_sillas
    ) {
      if (this.totalEntradas > 0) {
        this.totalCompra -= this.totalEntradas;
      }
      this.totalEntradas = this.cantidadEntradas * this.funcion.precio;
      this.totalCompra += this.totalEntradas;
    } else {
      this.totalCompra -= this.totalEntradas;
      this.cantidadEntradas = 0;
      this.totalEntradas = 0;
      Swal.fire({
        title: 'Compra de entradas',
        text:
          'No puede comprar mas de ' +
          this.funcion.sala.distribucionSillas.total_sillas +
          ' entradas',
        icon: 'warning',
      });
    }
  }

  asignarCompraDetalle(compra_detalle: CompraDetalle) {
    this.cantidadEntradas = compra_detalle.cantidadEntradas;
    this.confiteriaTotal = compra_detalle.confiteriaTotal;
    this.confiteriaTotalCombos = compra_detalle.confiteriaTotalCombos;
    this.totalCompra = compra_detalle.totalCompra;
    this.totalCompraCombos = compra_detalle.totalCompraCombos;
    this.totalCompraConfiterias = compra_detalle.totalCompraConfiterias;
    this.totalEntradas = compra_detalle.totalEntradas;
  }

  agregarSillas() {
    for (let i = 0; i < this.cantidadEntradas; i++) {
      this.entradas.push({
        codigo: 0,
        columna: 0,
        fila: 0,
        precio: this.funcion.precio,
      });
    }

    this.confiteriaTotal.forEach((c) => {
      if (c.cantidad > 0) {
        let confit = this.confiterias[c.index];
        this.compraConfiteria.push({
          cantidad: c.cantidad,
          codigo: 0,
          confiteria: confit,
          precio: confit.precio,
        });
      }
    });

    this.confiteriaTotalCombos.forEach((c) => {
      if (c.cantidad > 0) {
        let comb = this.combos[c.index];
        this.compraCombos.push({
          cantidad: c.cantidad,
          codigo: 0,
          combo: comb,
          precio: comb.precio,
        });
      }
    });

    let compra: Compra = {
      codigo: 0,
      compraCombos: this.compraCombos,
      compraConfiterias: this.compraConfiteria,
      entradas: this.entradas,
      fecha_compra: new Date(),
      medioPago: '',
      valor_total: this.totalCompra,
      funcion: this.funcion,
    };

    let compra_detalle: CompraDetalle = {
      cantidadEntradas: this.cantidadEntradas,
      confiteriaTotal: this.confiteriaTotal,
      confiteriaTotalCombos: this.confiteriaTotalCombos,
      totalCompra: this.totalCompra,
      totalCompraCombos: this.totalCompraCombos,
      totalCompraConfiterias: this.totalCompraConfiterias,
      totalEntradas: this.totalEntradas,
    };

    let compraLocal: Compra =
      localStorage.getItem('compra') !== null
        ? JSON.parse(localStorage.getItem('compra')!)
        : [];

    if (Object.keys(compraLocal).length !== 0) {
      compraLocal.entradas = this.entradas;
      compraLocal.compraCombos = this.compraCombos;
      compraLocal.compraConfiterias = this.compraConfiteria;
      this.peliculasService.cambiarCompra(compraLocal);
      localStorage.removeItem('compra');
      localStorage.setItem('compra', JSON.stringify(compraLocal));
    } else {
      this.peliculasService.cambiarCompra(compra);
      localStorage.setItem('compra', JSON.stringify(compra));
    }

    localStorage.setItem('compra_detalle', JSON.stringify(compra_detalle));
  }
}
