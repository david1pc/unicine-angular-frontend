import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Compra } from 'src/app/admin/interfaces/admin.interface';
import Swal from 'sweetalert2';
import { PeliculasService } from '../../services/peliculas.service';
import { CompraDetalle, confiteriaTotal } from '../compra/compra.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  panelOpenState = false;
  confiteriaTotal: confiteriaTotal[] = [];
  confiteriaTotalCombos: confiteriaTotal[] = [];
  compra!: Compra;
  cantidadEntradas!: number;
  totalEntradas: number = 0;
  totalCompraCombos: number = 0;
  totalCompraConfiterias: number = 0;
  totalCompra: number = 0;
  compraDetalle!: CompraDetalle;

  totalSinDescuentoCompraCombos: number = 0;
  totalSinDescuentoCompraConfiterias: number = 0;
  totalSinDescuentoCompra: number = 0;
  totalSinDescuentoEntradas: number = 0;
  descuento: number = 0;

  codigoCupon: number = 0;
  criteriosAceptados: string[] = ['G', 'C', 'CO', 'E'];

  constructor(
    private peliculasService: PeliculasService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.peliculasService.ultimaSeleccionCompra.subscribe((f: Compra) => {
      this.compra = f;
    });

    let compra_detalle =
      localStorage.getItem('compra_detalle') !== null
        ? JSON.parse(localStorage.getItem('compra_detalle')!)
        : [];

    if (Object.keys(compra_detalle).length !== 0) {
      this.compraDetalle = compra_detalle;
      this.asignarCompraDetalle(compra_detalle);
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

  irAtras() {
    this.router.navigate(['/cartelera/funcion/compra/sillas']);
  }

  redimirCupon() {
    this.peliculasService.redimirCupon(this.codigoCupon).subscribe({
      next: (e) => {
        this._snackBar.open(e.mensaje, 'Aceptar', {
          duration: 2000,
        });

        if (this.totalSinDescuentoCompra > 0) {
          this.vaciarPrecios();
        }

        this.descuento = e.cupon.descuento;

        let criterios: string[] = e.cupon.criterio.split(' ');
        for (let i = 0; i < criterios.length; i++) {
          for (let j = 0; j < this.criteriosAceptados.length; j++) {
            if (criterios[i] === this.criteriosAceptados[j]) {
              if (criterios[i] === 'C') {
                this.totalSinDescuentoCompraConfiterias =
                  this.totalCompraConfiterias;
                this.totalCompraConfiterias =
                  this.totalCompraConfiterias -
                  this.totalCompraConfiterias * (e.cupon.descuento / 100);
                this.totalCompra -= this.totalSinDescuentoCompraConfiterias;
                this.totalCompra += this.totalCompraConfiterias;
              } else if (criterios[i] === 'CO') {
                this.totalSinDescuentoCompraCombos = this.totalCompraCombos;
                this.totalCompraCombos =
                  this.totalCompraCombos -
                  this.totalCompraCombos * (e.cupon.descuento / 100);
                this.totalCompra -= this.totalSinDescuentoCompraCombos;
                this.totalCompra += this.totalCompraCombos;
              } else if (criterios[i] === 'G') {
                this.totalSinDescuentoCompraCombos = this.totalCompraCombos;
                this.totalCompraCombos =
                  this.totalCompraCombos -
                  this.totalCompraCombos * (e.cupon.descuento / 100);
                this.totalSinDescuentoCompraConfiterias =
                  this.totalCompraConfiterias;
                this.totalCompraConfiterias =
                  this.totalCompraConfiterias -
                  this.totalCompraConfiterias * (e.cupon.descuento / 100);
                this.totalSinDescuentoEntradas = this.totalEntradas;
                this.totalEntradas =
                  this.totalEntradas -
                  this.totalEntradas * (e.cupon.descuento / 100);
                this.totalSinDescuentoCompra = this.totalCompra;
                this.totalCompra =
                  this.totalCompraCombos +
                  this.totalEntradas +
                  this.totalCompraConfiterias;
              } else if (criterios[i] === 'E') {
                this.totalSinDescuentoEntradas = this.totalEntradas;
                this.totalEntradas =
                  this.totalEntradas -
                  this.totalEntradas * (e.cupon.descuento / 100);
                this.totalCompra -= this.totalSinDescuentoEntradas;
                this.totalCompra += this.totalEntradas;
              }

              break;
            }
          }
        }
      },
      error: (error) => {
        this._snackBar.open(error.error.error, 'Aceptar', {
          duration: 2000,
        });
      },
    });
  }

  vaciarPrecios() {
    this.totalEntradas = this.compraDetalle.totalEntradas;
    this.totalCompraCombos = this.compraDetalle.totalCompraCombos;
    this.totalCompraConfiterias = this.compraDetalle.totalCompraConfiterias;
    this.totalCompra = this.compraDetalle.totalCompra;
    this.totalSinDescuentoCompraCombos = 0;
    this.totalSinDescuentoCompraConfiterias = 0;
    this.totalSinDescuentoCompra = 0;
    this.totalSinDescuentoEntradas = 0;
    this.descuento = 0;
  }
}
