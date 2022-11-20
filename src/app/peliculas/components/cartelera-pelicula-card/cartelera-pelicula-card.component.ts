import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {
  Ciudad,
  Compra,
  Funcion,
  Horario,
  Pelicula,
  Sala,
} from 'src/app/admin/interfaces/admin.interface';
import { AdminTeatroService } from 'src/app/admin/services/admin-teatro.service';
import { AdminService } from 'src/app/admin/services/admin.service';
import Swal from 'sweetalert2';
import { PeliculasService } from '../../services/peliculas.service';

export interface Dias {
  dia: string;
  i: string;
}

export interface Horas {
  codigoFuncion: number;
  hora: Date;
}

export interface FuncionDisponibles {
  codigo: number;
  sala: Sala;
  horas: Horas[];
}

export interface Fecha {
  fecha: string;
  dia: string;
}

export interface FechaParse {
  fecha: Date;
  dia: string;
}

@Component({
  selector: 'app-cartelera-pelicula-card',
  templateUrl: './cartelera-pelicula-card.component.html',
  styleUrls: ['./cartelera-pelicula-card.component.css'],
})
export class CarteleraPeliculaCardComponent implements OnInit {
  panelOpenState = false;
  ver: number = 0;
  dias: Dias[] = [
    { dia: 'Mon', i: 'L' },
    { dia: 'Tue', i: 'M' },
    { dia: 'Wed', i: 'MI' },
    { dia: 'Thu', i: 'J' },
    { dia: 'Fri', i: 'V' },
    { dia: 'Sat', i: 'S' },
    { dia: 'Sun', i: 'D' },
  ];

  ciudades!: Ciudad[];
  ciudadSelec!: Ciudad;
  funcionesDisponibles: FuncionDisponibles[] = [];

  diasFuncion: string[] = [];
  diasMostrar: Fecha[] = [];
  horaFuncion!: Date;

  pelicula!: Pelicula;
  funciones!: Funcion[];
  fechaSelect!: Date;
  funcionSelect!: Funcion;

  url_trailer_safe: any;
  constructor(
    private peliculasService: PeliculasService,
    private adminTeatroService: AdminTeatroService,
    private router: Router,
    private _sanitizer: DomSanitizer,
    private offcanvasService: NgbOffcanvas
  ) {}

  ngOnInit(): void {
    this.adminTeatroService.listarCiudades().subscribe((result) => {
      this.ciudades = result.ciudades;
    });
    this.peliculasService.ultimaSeleccionPelicula.subscribe((pelicula) => {
      let peliculaLocal =
        localStorage.getItem('pelicula') !== null
          ? JSON.parse(localStorage.getItem('pelicula')!)
          : [];
      if (Object.keys(peliculaLocal).length === 0) {
        this.pelicula = pelicula;
        localStorage.setItem('pelicula', JSON.stringify(pelicula));
      } else {
        this.pelicula = peliculaLocal;
      }
    });

    if (Object.keys(this.pelicula).length === 0) {
      const irAlLobby = () => {
        this.router.navigate(['./']);
      };
      Swal.fire({
        title: 'Ver pelicula',
        text: 'No se ha seleccionado ninguna pelicula',
        icon: 'info',
        didClose() {
          irAlLobby();
        },
      });
    }

    this.url_trailer_safe = this._sanitizer.bypassSecurityTrustResourceUrl(
      this.pelicula.url_trailer
    );

    let date = new Date();

    for (let i = 1; i < 10; i++) {
      let fecha = date.toLocaleDateString();
      let dia = date.toDateString().split(' ')[0];
      this.diasMostrar.push({
        dia: dia,
        fecha: fecha,
      });
      date.setDate(date.getDate() + 1);
    }
  }

  cambiarCiudad(ciudad: Ciudad) {
    this.ciudadSelec = ciudad;
  }

  verFuncion(dia: Fecha) {
    let d: string = '';
    this.dias.map((dia_a) => {
      if (dia_a.dia === dia.dia) {
        d = dia_a.i;
      }
    });

    let fecha = moment(dia.fecha, 'DD/MM/YYYY').toDate();

    this.peliculasService
      .listarFuncionesPeliculas(
        this.ciudadSelec.codigo,
        this.pelicula.codigo,
        fecha,
        d
      )
      .subscribe((result) => {
        this.funciones = result.funciones;
        this.funcionesDisponibles = [];
        if (result.funciones.length > 0) {
          let h: Horas[] = [];
          h.push({
            codigoFuncion: result.funciones[0].codigo,
            hora: result.funciones[0].horario.hora,
          });
          this.funcionesDisponibles.push({
            codigo: 0,
            horas: h,
            sala: result.funciones[0].sala,
          });
          for (let i = 1; i < result.funciones.length; i++) {
            for (let j = 0; j < this.funcionesDisponibles.length; j++) {
              if (
                this.funcionesDisponibles[j].sala.teatro.codigo ==
                result.funciones[i].sala.teatro.codigo
              ) {
                this.funcionesDisponibles[j].horas.push({
                  codigoFuncion: result.funciones[i].codigo,
                  hora: result.funciones[i].horario.hora,
                });
              } else {
                this.funcionesDisponibles.push({
                  codigo: i,
                  sala: result.funciones[i].sala,
                  horas: [
                    {
                      codigoFuncion: result.funciones[i].codigo,
                      hora: result.funciones[i].horario.hora,
                    },
                  ],
                });
              }
              break;
            }
          }
        }
      });
  }

  verSillas(codigoFuncion: number, content: TemplateRef<any>) {
    let funcion!: Funcion;
    this.funciones.forEach((f) => {
      if (f.codigo == codigoFuncion) {
        funcion = f;
      }
    });

    this.funcionSelect = funcion;

    this.openBottom(content);
  }

  agregarFuncion(offcanvas: any) {
    this.peliculasService.cambiarFuncion(this.funcionSelect);
    localStorage.setItem('funcion', JSON.stringify(this.funcionSelect));
    offcanvas.close();
  }

  openBottom(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'bottom' });
  }
}
