import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { Genero, Pelicula } from '../../interfaces/admin.interface';
import { MatDialog } from '@angular/material/dialog';
import { AgregarPeliculaComponent } from '../../components/agregar-pelicula/agregar-pelicula.component';
import { EliminarPeliculaComponent } from '../../components/eliminar-pelicula/eliminar-pelicula.component';

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
    'url_img',
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
    let url_img: string = '';
    let genero!: Genero;
    let reparto: string = '';
    let estado: boolean = false;

    const dialogRef = this.dialog.open(AgregarPeliculaComponent, {
      width: '50%',
      data: {
        nombre: nombre,
        sinopsis: sinopsis,
        url_trailer: url_trailer,
        url_img: url_img,
        genero: genero,
        reparto: reparto,
        estado: estado,
      },
    });

    dialogRef.afterClosed().subscribe((result: Pelicula) => {
      this.adminService.agregarPelicula(result).subscribe((resp) => {
        this.ngOnInit();
      });
    });
  }

  editar() {
    let codigo: number = 0;
    let nombre: string = '';
    let sinopsis: string = '';
    let url_trailer: string = '';
    let url_img: string = '';
    let genero!: Genero;
    let reparto: string = '';
    let estado: boolean = false;

    if (this.selection.selected.length == 1) {
      let pelicula: Pelicula = this.selection.selected[0];

      nombre = pelicula.nombre;
      sinopsis = pelicula.sinopsis;
      url_trailer = pelicula.url_trailer;
      url_img = pelicula.url_img;
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
          url_img: url_img,
          genero: genero,
          reparto: reparto,
          estado: estado,
          codigo: codigo,
        },
      });

      dialogRef.afterClosed().subscribe((result: Pelicula) => {
        this.adminService.editarPelicula(result).subscribe((resp) => {
          this.ngOnInit();
          this.selection.clear();
        });
      });
    }
  }

  eliminar() {
    let ids_peliculas: number[] = [];
    this.selection.selected.map((element) => {
      ids_peliculas.push(element.codigo);
    });

    const dialogRef = this.dialog.open(EliminarPeliculaComponent, {
      width: '35%',
      data: { estadoConfirmacion: false },
    });

    dialogRef.afterClosed().subscribe((estadoConfirmacion: Boolean) => {
      if (estadoConfirmacion) {
        this.adminService.eliminarPelicula(ids_peliculas).subscribe((resp) => {
          this.ngOnInit();
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
