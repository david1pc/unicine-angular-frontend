import { Component, OnInit } from '@angular/core';
import {
  Compra,
  Compra2,
  CompraConfiteria,
  Cupon,
} from 'src/app/admin/interfaces/admin.interface';
import {
  CompraDetalle,
  confiteriaTotal,
} from 'src/app/peliculas/pages/compra/compra.component';
import Swal from 'sweetalert2';
import { ClienteServiceService } from '../../services/cliente.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
})
export class ComprasComponent implements OnInit {
  panelOpenState = false;
  comprasCliente!: Compra2[];
  compraConfiteria!: CompraConfiteria[];
  totalSinDescuentoCompraCombos: number[] = [];
  totalSinDescuentoCompraConfiterias: number[] = [];
  totalSinDescuentoCompra: number[] = [];
  totalSinDescuentoEntradas: number[] = [];
  totalCompraConfiterias: number[] = [];
  totalCompra: number[] = [];
  totalEntradas: number[] = [];
  totalCompraCombos: number[] = [];
  metodoPagoEscogido: string[] = [];

  cupones: Cupon[] = [];
  criteriosAceptados: string[] = ['G', 'C', 'CO', 'E'];
  constructor(private clienteService: ClienteServiceService) {}

  ngOnInit(): void {
    let username = localStorage.getItem('username') || '';
    this.clienteService.listarComprasCliente(username).subscribe({
      next: (result) => {
        this.comprasCliente = result.compras;
        this.realizarDetalleCompra();
      },
      error: (error) => {
        Swal.fire({
          title: 'Error al obtener las compras del cliente',
          text: error.error.mensaje,
          icon: 'error',
        });
      },
    });
  }

  calculasSubtotales(compra: Compra2) {
    let totalEntrada = 0;
    let totalConfiteria = 0;
    let totalCombos = 0;

    for (let i = 0; i < compra.entradas.length; i++) {
      totalEntrada += compra.entradas[i].precio;
    }

    for (let k = 0; k < compra.compraConfiterias.length; k++) {
      totalConfiteria += compra.compraConfiterias[k].precio;
    }

    for (let l = 0; l < compra.compraCombos.length; l++) {
      totalCombos += compra.compraCombos[l].precio;
    }

    this.totalCompraCombos.push(totalCombos);
    this.totalCompraConfiterias.push(totalConfiteria);
    this.totalEntradas.push(totalEntrada);
    this.totalCompra.push(compra.valor_total);
  }

  realizarDetalleCompra() {
    for (let i = 0; i < this.comprasCliente.length; i++) {
      this.calculasSubtotales(this.comprasCliente[i]);
      if (this.comprasCliente[i].cuponCliente != null || undefined) {
        this.calcularPrecios(this.comprasCliente[i]);
      }
    }
  }

  calcularPrecios(compra: Compra2) {
    this.cupones.push(compra.cuponCliente!.cupon);

    let criterios: string[] = compra.cuponCliente!.cupon.criterio.split(' ');

    for (let i = 0; i < criterios.length; i++) {
      for (let j = 0; j < this.criteriosAceptados.length; j++) {
        if (criterios[i] === this.criteriosAceptados[j]) {
          if (criterios[i] === 'C') {
            this.totalSinDescuentoCompraConfiterias[i] =
              this.totalCompraConfiterias[i];
            this.totalCompraConfiterias[i] =
              this.totalCompraConfiterias[i] -
              this.totalCompraConfiterias[i] *
                (compra.cuponCliente!.cupon.descuento / 100);
            this.totalCompra[i] -= this.totalSinDescuentoCompraConfiterias[i];
            this.totalCompra[i] += this.totalCompraConfiterias[i];
          } else if (criterios[i] === 'CO') {
            this.totalSinDescuentoCompraCombos[i] = this.totalCompraCombos[i];
            this.totalCompraCombos[i] =
              this.totalCompraCombos[i] -
              this.totalCompraCombos[i] *
                (compra.cuponCliente!.cupon.descuento / 100);
            this.totalCompra[i] -= this.totalSinDescuentoCompraCombos[i];
            this.totalCompra[i] += this.totalCompraCombos[i];
          } else if (criterios[i] === 'G') {
            this.totalSinDescuentoCompraCombos = this.totalCompraCombos;
            this.totalCompraCombos[i] =
              this.totalCompraCombos[i] -
              this.totalCompraCombos[i] *
                (compra.cuponCliente!.cupon.descuento / 100);
            this.totalSinDescuentoCompraConfiterias[i] =
              this.totalCompraConfiterias[i];
            this.totalCompraConfiterias[i] =
              this.totalCompraConfiterias[i] -
              this.totalCompraConfiterias[i] *
                (compra.cuponCliente!.cupon.descuento / 100);
            this.totalSinDescuentoEntradas[i] = this.totalEntradas[i];
            this.totalEntradas[i] =
              this.totalEntradas[i] -
              this.totalEntradas[i] *
                (compra.cuponCliente!.cupon.descuento / 100);
            this.totalSinDescuentoCompra[i] = this.totalCompra[i];
            this.totalCompra[i] =
              this.totalCompraCombos[i] +
              this.totalEntradas[i] +
              this.totalCompraConfiterias[i];
          } else if (criterios[i] === 'E') {
            this.totalSinDescuentoEntradas[i] = this.totalEntradas[i];
            this.totalEntradas[i] =
              this.totalEntradas[i] -
              this.totalEntradas[i] *
                (compra.cuponCliente!.cupon.descuento / 100);
            this.totalCompra[i] -= this.totalSinDescuentoEntradas[i];
            this.totalCompra[i] += this.totalEntradas[i];
          }

          break;
        }
      }
    }
  }
}
