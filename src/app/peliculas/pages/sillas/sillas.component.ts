import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import {
  Compra,
  DistribucionSillas,
} from 'src/app/admin/interfaces/admin.interface';
import Swal from 'sweetalert2';
import { PeliculasService } from '../../services/peliculas.service';

export interface obj {
  f: number;
  columna: number;
  fila: string;
  ind?: string;
}

@Component({
  selector: 'app-sillas',
  templateUrl: './sillas.component.html',
  styleUrls: ['./sillas.component.css'],
})
export class SillasComponent implements OnInit {
  filas: number[] = [];
  columnas: number[] = [];
  esquema: obj[] = [];
  esquemaFinal: string[] = [];
  compra!: Compra;
  contadorEntradas: number = 0;
  contadorEntradasDisponibles: number = 0;
  entradasSeleccionadas: any[][] = [[]];
  esSillasGuardadas: boolean = false;
  link!: string;

  dataF: obj[] = [];

  alf: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  @ViewChild('grid', { static: true }) grid!: ElementRef<HTMLDivElement>;
  @ViewChild('silla', { static: true }) silla!: ElementRef<HTMLButtonElement>;

  gridColumns!: string;
  colorSilla = '#2A2C41';

  constructor(
    private peliculasService: PeliculasService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private routerActive: ActivatedRoute
  ) {
    this.entradasSeleccionadas.splice(0, 1);
  }

  ngOnInit(): void {
    this.peliculasService.ultimaSeleccionCompra.subscribe((f: Compra) => {
      if (f == null || f == undefined || Object.keys(f).length === 0) {
        let compraLocal =
          localStorage.getItem('compra') !== null
            ? JSON.parse(localStorage.getItem('compra')!)
            : [];
        this.compra = compraLocal;
        this.gridColumns = '1fr '.repeat(
          this.compra.funcion.sala.distribucionSillas.columnas
        );
        this.esSillasGuardadas = this.verificarEntradas();
      } else {
        console.log('4--');
        this.compra = f;
        this.gridColumns = '1fr '.repeat(
          this.compra.funcion.sala.distribucionSillas.columnas
        );
        this.esSillasGuardadas = this.verificarEntradas();
      }
    });

    let esquema_frac: string[] = [];
    let cont: number = 0;

    if (this.compra.funcion.sala.distribucionSillas.esquema) {
      esquema_frac =
        this.compra.funcion.sala.distribucionSillas.esquema.split(',');
    }

    let i: number = 1;
    while (i <= this.compra.funcion.sala.distribucionSillas.filas) {
      this.filas.push(i);
      i += 1;
    }
    i = 1;
    while (i <= this.compra.funcion.sala.distribucionSillas.columnas) {
      this.columnas.push(i);
      i += 1;
    }

    for (let i = 0; i < this.filas.length; i++) {
      for (let j = 0; j < this.columnas.length; j++) {
        let ind = esquema_frac[cont];
        let obj = {
          fila: this.alf[i],
          columna: j,
          f: i,
          ind: ind,
        };

        this.dataF.push(obj);

        if (this.compra.funcion.sala.distribucionSillas.esquema) {
          this.esquema.push({
            columna: j,
            f: i,
            fila: ind,
          });
        } else {
          this.esquema.push({
            columna: j,
            f: i,
            fila: '*',
          });
        }
        cont += 1;
      }
    }
  }

  refrescar() {
    window.location.reload();
  }

  cambiarColor(event: any) {
    const element = document.getElementById(event.target.id);
    const filaCol: string[] = element!.id.split(',');
    let i = Number(filaCol[0]);
    let j = Number(filaCol[1]);

    if (element?.style.borderColor === 'rgb(205, 149, 8)') {
      element!.style.border = '2px solid #2A2C41';
      this.esquema.map((e) => {
        if (e.f === i && e.columna === j) {
          e.fila = '*';
          this.compra.funcion.sala.distribucionSillas.total_sillas += 1;
          this.contadorEntradas -= 1;
          this.contadorEntradasDisponibles += 1;
          for (let k = 0; k < this.entradasSeleccionadas.length; k++) {
            let en = this.entradasSeleccionadas[k];
            if (en[0] === i && en[1] === j) {
              this.entradasSeleccionadas.splice(k, 1);
              break;
            }
          }
        }
      });
    } else {
      if (this.contadorEntradas < this.compra.entradas.length) {
        element!.style.border = '2px solid rgb(205, 149, 8)';
        this.esquema.map((e) => {
          if (e.columna === j && e.f === i) {
            e.fila = '+';
            this.compra.funcion.sala.distribucionSillas.total_sillas -= 1;
            this.contadorEntradas += 1;
            this.contadorEntradasDisponibles -= 1;
            let entSe: any[] = [];
            entSe.push(i, j, this.alf[i]);
            this.entradasSeleccionadas.push(entSe);
          }
        });
      } else {
        this._snackBar.open('No puede seleccionar más sillas', 'Aceptar', {
          duration: 2000,
        });
      }
    }
  }

  guardar() {
    if (this.esSillasGuardadas) {
      this.router.navigate(['/cartelera/funcion/compra/sillas/checkout'], {
        relativeTo: this.routerActive,
      });
      return;
    }
    if (this.contadorEntradas === this.compra.entradas.length) {
      this.esquemaFinal = [];
      this.esquema.forEach((e) => {
        this.esquemaFinal.push(e.fila);
      });
      this.compra.funcion.sala.distribucionSillas.esquema =
        this.esquemaFinal.toString();

      for (let i = 0; i < this.compra.entradas.length; i++) {
        this.compra.entradas[i].fila = this.entradasSeleccionadas[i][0];
        this.compra.entradas[i].columna = this.entradasSeleccionadas[i][1];
        this.compra.entradas[i].ind = this.entradasSeleccionadas[i][2];
      }
      this.router.navigate(['/cartelera/funcion/compra/sillas/checkout'], {
        relativeTo: this.routerActive,
      });
      this.peliculasService.cambiarCompra(this.compra);
    } else {
      this._snackBar.open('Debe seleccionar más sillas', 'Aceptar', {
        duration: 2000,
      });
    }
  }

  verificarEntradas() {
    let esSillaGuardada = false;

    for (let i = 0; i < this.compra.entradas.length; i++) {
      if (
        (this.compra.entradas[i].columna != 0 &&
          this.compra.entradas[i].fila != 0 &&
          this.compra.entradas[i].ind !== null) ||
        this.compra.entradas[i].ind !== undefined ||
        this.compra.entradas[i].ind
      ) {
        esSillaGuardada = true;
        break;
      }
    }

    if (esSillaGuardada) {
      this.contadorEntradasDisponibles = 0;
      this.contadorEntradas = this.compra.entradas.length;
    } else {
      this.contadorEntradasDisponibles = this.compra.entradas.length;
      this.contadorEntradas = 0;
    }

    return esSillaGuardada;
  }
}
