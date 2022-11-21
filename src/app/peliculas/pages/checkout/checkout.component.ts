import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  Compra,
  CuponCliente,
  Entrada,
  Entrada2,
} from 'src/app/admin/interfaces/admin.interface';
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
  contenido!: string;
  nuevaCompra!: Compra;
  totalSinDescuentoCompraCombos: number = 0;
  totalSinDescuentoCompraConfiterias: number = 0;
  totalSinDescuentoCompra: number = 0;
  totalSinDescuentoEntradas: number = 0;
  descuento: number = 0;
  metodoPago: string[] = ['NEQUI', 'DAVIPLATA', 'MASTERCARD', 'EFECTIVO'];
  metodoPagoEscogido!: string;
  codigoCupon: number = 0;
  criteriosAceptados: string[] = ['G', 'C', 'CO', 'E'];
  cuponCliente!: CuponCliente;
  final: string = `</div>
      </body>
  </html>`;
  cuponRegistrado!: CuponCliente;

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
        this.cuponRegistrado = {
          cupon: e.cupon,
          estado: true,
          codigo: 0,
        };
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

  enviar(contenido: string) {
    this.peliculasService
      .registrarCompra(this.nuevaCompra, contenido, this.cuponRegistrado)
      .subscribe((result) => {
        const redir = () => {
          this.router.navigate(['./perfil/compras']);
        };
        Swal.fire({
          title: 'Compra de la funcion',
          text: result.mensaje,
          icon: 'success',
          didClose() {
            redir();
          },
        });
      });
  }

  realizarCompra() {
    let entradas: Entrada2[] = [];
    for (let i = 0; i < this.compra.entradas.length; i++) {
      entradas.push({
        codigo: 0,
        columna: this.compra.entradas[i].columna,
        fila: this.compra.entradas[i].fila,
        precio: this.compra.entradas[i].precio,
      });
    }
    let compra: Compra = {
      codigo: 0,
      compraCombo: this.compra.compraCombo,
      compraConfiteria: this.compra.compraConfiteria,
      entradas: this.compra.entradas,
      fecha_compra: new Date(),
      funcion: this.compra.funcion,
      medioPago: this.metodoPagoEscogido,
      valor_total: this.totalCompra,
      cuponCliente: this.cuponRegistrado,
    };

    this.nuevaCompra = compra;

    let fecha_escogida = localStorage.getItem('fecha_escogida');

    this.peliculasService
      .generarCodigoQREntrada(compra.entradas)
      .subscribe((barcode) => {
        let inicio: string = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css?family=Cabin|Indie+Flower|Inknut+Antiqua|Lora|Ravi+Prakash"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <title>Document</title>
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            background: #ddd;
            font-family: "Inknut Antiqua", serif;
            font-family: "Ravi Prakash", cursive;
            font-family: "Lora", serif;
            font-family: "Indie Flower", cursive;
            font-family: "Cabin", sans-serif;
          }
          div.container {
            max-width: 1350px;
            margin: 0 auto;
            overflow: hidden;
          }
          .upcomming {
            font-size: 45px;
            text-transform: uppercase;
            border-left: 14px solid rgba(255, 235, 59, 0.78);
            padding-left: 12px;
            margin: 18px 8px;
          }
          .container .item {
            width: 48%;
            float: left;
            padding: 0 20px;
            background: #fff;
            overflow: hidden;
            margin: 10px;
          }
          .container .item-right,
          .container .item-left {
            float: left;
            padding: 20px;
          }
          .container .item-right {
            padding: 79px 50px;
            margin-right: 20px;
            width: 25%;
            position: relative;
            height: 286px;
          }
          .container .item-right .up-border,
          .container .item-right .down-border {
            padding: 14px 15px;
            background-color: #ddd;
            border-radius: 50%;
            position: absolute;
          }
          .container .item-right .up-border {
            top: -8px;
            right: -35px;
          }
          .container .item-right .down-border {
            bottom: -13px;
            right: -35px;
          }
          .container .item-right .num {
            font-size: 60px;
            text-align: center;
            color: #111;
          }
          .container .item-right .day,
          .container .item-left .event {
            color: #555;
            font-size: 20px;
            margin-bottom: 9px;
          }
          .container .item-right .day {
            text-align: center;
            font-size: 25px;
          }
          .container .item-left {
            width: 71%;
            padding: 34px 0px 19px 46px;
            border-left: 3px dotted #999;
          }
          .container .item-left .title {
            color: #111;
            font-size: 34px;
            margin-bottom: 12px;
          }
          .container .item-left .sce {
            margin-top: 5px;
            display: block;
          }
          .container .item-left .sce .icon,
          .container .item-left .sce p,
          .container .item-left .loc .icon,
          .container .item-left .loc p {
            float: left;
            word-spacing: 5px;
            letter-spacing: 1px;
            color: #888;
            margin-bottom: 10px;
          }
          .container .item-left .sce .icon,
          .container .item-left .loc .icon {
            margin-right: 10px;
            font-size: 20px;
            color: #666;
          }
          .container .item-left .loc {
            display: block;
          }
          .fix {
            clear: both;
          }
          .container .item .tickets,
          .booked,
          .cancel {
            color: #fff;
            padding: 6px 14px;
            float: right;
            margin-top: 10px;
            font-size: 18px;
            border: none;
            cursor: pointer;
          }
          .container .item .tickets {
            background: #777;
          }
          .container .item .booked {
            background: #3d71e9;
          }
          .container .item .cancel {
            background: #df5454;
          }
          .linethrough {
            text-decoration: line-through;
          }
          @media only screen and (max-width: 1150px) {
            .container .item {
              width: 100%;
              margin-right: 20px;
            }
            div.container {
              margin: 0 20px auto;
            }
          }
        </style>
        <body>
          <div class="container">
            <h1 class="upcomming">Unicine</h1>
            <p>Total compra: ${compra.valor_total}</p>`;
        for (let i = 0; i < barcode.length; i++) {
          let tiquete: string = `<div class="item">
          <div class="item-right">
            <h2 class="num">Hora</h2>
            <p class="day">${compra.funcion.horario.hora}</p>
            <span class="up-border"></span>
            <span class="down-border"></span>
          </div> <!-- end item-right -->
          <div class="item-left">
            <p class="event">${compra.funcion.pelicula.nombre}</p>
            <h2 class="title">${compra.funcion.sala.teatro.ciudad.nombre} : ${compra.funcion.sala.teatro.direccion}</h2>
            <img width="100px" height="100px" src="data:image/png;base64,${barcode[i]}" alt="">
            <div class="sce">
              <div class="icon">
                <i class="fa fa-table"></i>
              </div>
              <p>Fecha: ${fecha_escogida}<br/></p>
            </div>
            <div class="fix"></div>
            <div class="loc">
              <div class="icon">
                <i class="fa fa-map-marker"></i>
              </div>
              <p>Precio: $${compra.funcion.precio}<br/> Sala: ${compra.funcion.sala.nombre}</p>
            </div>
            <div class="fix"></div>
          </div> <!-- end item-right -->
        </div> <!-- end item -->`;
          inicio += tiquete;
        }
        inicio += this.final;
        this.enviar(inicio);
      });
  }
}
