import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DistribucionSillas } from '../../interfaces/admin.interface';

export interface obj {
  f: number;
  columna: number;
  fila: string;
  ind?: string;
}

@Component({
  selector: 'app-esquema',
  templateUrl: './esquema.component.html',
  styleUrls: ['./esquema.component.css'],
})
export class EsquemaComponent implements OnInit {
  filas: number[] = [];
  columnas: number[] = [];
  esquema: obj[] = [];
  esquemaFinal: string[] = [];

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

  gridColumns = '1fr '.repeat(this.data.columnas);
  colorSilla = '#2A2C41';

  constructor(
    public dialogRef: MatDialogRef<EsquemaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DistribucionSillas
  ) {}

  ngOnInit(): void {
    let esquema_frac: string[] = [];
    let cont: number = 0;

    if (this.data.esquema) {
      esquema_frac = this.data.esquema.split(',');
    }

    let i: number = 1;
    while (i <= this.data.filas) {
      this.filas.push(i);
      i += 1;
    }
    i = 1;
    while (i <= this.data.columnas) {
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

        if (this.data.esquema) {
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

  cambiarColor(event: any) {
    const element = document.getElementById(event.target.id);
    const filaCol: string[] = element!.id.split(',');
    let i = Number(filaCol[0]);
    let j = Number(filaCol[1]);
    if (element?.style.borderColor === 'rgb(51, 255, 87)') {
      element!.style.border = '2px solid #2A2C41';
      this.esquema.map((e) => {
        if (e.f === i && e.columna === j) {
          e.fila = '*';
          this.data.total_sillas += 1;
        }
      });
    } else {
      element!.style.border = '2px solid rgb(51, 255, 87)';
      this.esquema.map((e) => {
        if (e.columna === j && e.f === i) {
          e.fila = '-';
          this.data.total_sillas -= 1;
        }
      });
    }
  }

  guardar() {
    this.esquemaFinal = [];
    this.esquema.forEach((e) => {
      this.esquemaFinal.push(e.fila);
    });

    this.data.esquema = this.esquemaFinal.toString();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
