import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  Ciudad,
  Funcion,
  Pelicula,
  Teatro,
} from 'src/app/admin/interfaces/admin.interface';
import Swal from 'sweetalert2';
import { FuncionModalComponent } from '../../components/funcion-modal/funcion-modal.component';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  estrenos: Pelicula[] = [];
  preventas: Pelicula[] = [];
  local: boolean = false;

  constructor(
    private peliculasService: PeliculasService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.estrenos =
      localStorage.getItem('estrenos') !== null
        ? JSON.parse(localStorage.getItem('estrenos')!)
        : [];

    this.preventas =
      localStorage.getItem('preventas') !== null
        ? JSON.parse(localStorage.getItem('preventas')!)
        : [];

    if (this.estrenos.length > 0 || this.preventas.length > 0) {
      this.local = true;
    }
  }

  buscarPeliculas() {
    let ciudad: Ciudad = {
      codigo: 0,
      nombre: '',
    };

    let teatro: Teatro = {
      ciudad: ciudad,
      codigo: 0,
      direccion: '',
      salas: [],
      telefono: '',
    };

    let dialogRef = this.dialog.open(FuncionModalComponent, {
      width: '50%',
      data: {
        ciudad: ciudad,
        teatro: teatro,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == null) {
        return;
      }
      localStorage.removeItem('estrenos');
      localStorage.removeItem('preventas');
      this.peliculasService
        .listarPeliculas(result.ciudad.codigo, result.teatro.codigo)
        .subscribe({
          next: (res: any) => {
            if (res.peliculas.length > 0) {
              this.estrenos = [];
              this.preventas = [];
              for (let pelicula of res.peliculas) {
                if (pelicula.estado) {
                  this.estrenos.push(pelicula);
                } else {
                  this.preventas.push(pelicula);
                }
              }
              localStorage.setItem('estrenos', JSON.stringify(this.estrenos));
              localStorage.setItem('preventas', JSON.stringify(this.preventas));
            } else {
              Swal.fire({
                title: 'Buscar peliculas',
                text: 'No se han encontrado peliculas',
                icon: 'info',
              });
            }
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              title: 'Buscar peliculas',
              text: 'No se han encontrado peliculas',
              icon: 'info',
            });
          },
        });
    });
  }
}
