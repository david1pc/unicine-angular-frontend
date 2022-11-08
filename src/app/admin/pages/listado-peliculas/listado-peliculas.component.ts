import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import {
  Dialog,
  Genero,
  Imagen,
  Pelicula,
  PeliculaFile,
} from '../../interfaces/admin.interface';
import { MatDialog } from '@angular/material/dialog';
import { AgregarPeliculaComponent } from '../../components/agregar-pelicula/agregar-pelicula.component';
import { EliminarPeliculaComponent } from '../../components/eliminar-pelicula/eliminar-pelicula.component';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css'],
})
export class ListadoPeliculasComponent implements OnInit {
  peliculas: Pelicula[] = [];
  displayedColumns: string[] = [
    'select',
    'codigo',
    'nombre',
    'sinopsis',
    'url_trailer',
    'imagen',
    'genero',
    'estado',
    'reparto',
  ];

  dataSource!: MatTableDataSource<Pelicula>;
  selection = new SelectionModel<Pelicula>(true, []);

  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.adminService.listarPeliculas().subscribe((resultado) => {
      this.peliculas = resultado.peliculas;
      this.dataSource = new MatTableDataSource(resultado.peliculas);
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  agregar() {
    let nombre: string = '';
    let sinopsis: string = '';
    let url_trailer: string = '';
    let genero!: Genero;
    let reparto: string = '';
    let estado: boolean = true;
    let imagen: Imagen = {
      codigo: 0,
      imagenId: '',
      imagenUrl: '',
      nombre: '',
    };
    let imagenFile!: File;

    const dialogRef = this.dialog.open(AgregarPeliculaComponent, {
      width: '50%',
      data: {
        nombre: nombre,
        sinopsis: sinopsis,
        url_trailer: url_trailer,
        imagen: imagen,
        genero: genero,
        reparto: reparto,
        estado: estado,
        imagenFile: imagenFile,
      },
    });

    dialogRef.afterClosed().subscribe((result: PeliculaFile) => {
      this.adminService.agregarPelicula(result).subscribe({
        next: (resp: any) => {
          this.ngOnInit();
          let dialog: Dialog = {
            titulo: 'Crear pelicula',
            descripcion: resp.mensaje,
            icono: 'done',
            estado: false,
          };

          this.abrirDialog(dialog);
        },
        error: (err) => {
          let dialog: Dialog = {
            titulo: err.mensaje,
            icono: 'error',
            descripcion: err.error,
            estado: false,
          };

          this.abrirDialog(dialog);
        },
      });
    });
  }

  abrirDialog(dialog: Dialog) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: {
        titulo: dialog.titulo,
        descripcion: dialog.descripcion,
        estado: dialog.estado,
        icono: dialog.icono,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult: Dialog) => {
      return dialog.estado;
    });
  }

  editar() {
    let codigo: number = 0;
    let nombre: string = '';
    let sinopsis: string = '';
    let url_trailer: string = '';
    let imagen!: Imagen;
    let genero!: Genero;
    let reparto: string = '';
    let estado: boolean = false;

    if (this.selection.selected.length == 1) {
      let pelicula: Pelicula = this.selection.selected[0];
      nombre = pelicula.nombre;
      sinopsis = pelicula.sinopsis;
      url_trailer = pelicula.url_trailer;
      imagen = pelicula.imagen;
      genero = pelicula.genero;
      reparto = pelicula.reparto;
      estado = pelicula.estado;
      codigo = pelicula.codigo;

      const dialogRef = this.dialog.open(AgregarPeliculaComponent, {
        width: '50%',
        data: {
          nombre: nombre,
          sinopsis: sinopsis,
          url_trailer: url_trailer,
          imagen: imagen,
          genero: genero,
          reparto: reparto,
          estado: estado,
          codigo: codigo,
        },
      });

      dialogRef.afterClosed().subscribe((result: PeliculaFile) => {
        this.adminService.editarPelicula(result).subscribe({
          next: (resp: any) => {
            let dialog: Dialog = {
              titulo: 'Actualizar pelicula',
              icono: 'done',
              descripcion: resp.mensaje,
              estado: false,
            };
            this.abrirDialog(dialog);
            this.ngOnInit();
            this.selection.clear();
          },
          error: (err) => {
            let dialog: Dialog = {
              titulo: err.mensaje,
              icono: 'error',
              descripcion: err.error,
              estado: false,
            };

            this.abrirDialog(dialog);
          },
        });
      });
    } else {
      let dialog: Dialog = {
        titulo: 'Error al editar la pelicula',
        descripcion: 'Debe seleccionar una pelicula',
        icono: 'error',
        estado: false,
      };

      this.abrirDialog(dialog);
    }
  }

  eliminar() {
    let ids_peliculas: number[] = [];
    this.selection.selected.map((element) => {
      ids_peliculas.push(element.codigo);
    });

    if (ids_peliculas.length == 0) {
      let dialog: Dialog = {
        titulo: 'Error al eliminar la pelicula',
        descripcion: 'Debe seleccionar una pelicula',
        estado: false,
        icono: 'error',
      };

      this.abrirDialog(dialog);
      return;
    }

    const dialogRef = this.dialog.open(EliminarPeliculaComponent, {
      width: '35%',
      data: { estadoConfirmacion: false },
    });

    dialogRef.afterClosed().subscribe((estadoConfirmacion: Boolean) => {
      if (estadoConfirmacion) {
        this.adminService.eliminarPelicula(ids_peliculas).subscribe({
          next: (resp) => {
            let dialog: Dialog = {
              titulo: 'Eliminar pelicula',
              descripcion: resp.mensaje,
              icono: 'done',
              estado: false,
            };
            this.abrirDialog(dialog);
            this.ngOnInit();
            this.selection.clear();
          },
          error: (resp) => {
            let dialog: Dialog = {
              titulo: resp.error.mensaje,
              descripcion: resp.error.error,
              icono: 'error',
              estado: false,
            };
            this.abrirDialog(dialog);

            this.ngOnInit();
            this.selection.clear();
          },
        });
      }
    });
  }

  checkboxLabel(row?: Pelicula): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.codigo + 1
    }`;
  }
}
