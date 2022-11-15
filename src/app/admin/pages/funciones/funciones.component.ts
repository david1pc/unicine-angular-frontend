import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarFuncionComponent } from '../../components/agregar-funcion/agregar-funcion.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { EliminarFuncionComponent } from '../../components/eliminar-funcion/eliminar-funcion.component';
import {
  Dialog,
  Funcion,
  Genero,
  Horario,
  Pelicula,
  Sala,
} from '../../interfaces/admin.interface';
import { AdminTeatroService } from '../../services/admin-teatro.service';

@Component({
  selector: 'app-funciones',
  templateUrl: './funciones.component.html',
  styleUrls: ['./funciones.component.css'],
})
export class FuncionesComponent implements OnInit {
  funcionSeleccionada!: Funcion;
  funciones: Funcion[] = [];
  displayedColumns: string[] = [
    'select',
    'codigo',
    'precio',
    'sala',
    'horario',
    'pelicula',
  ];

  dataSource!: MatTableDataSource<Funcion>;
  selection = new SelectionModel<Funcion>(true, []);

  constructor(
    private adminTeatroService: AdminTeatroService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.buscarTeatros();
  }

  buscarTeatros() {
    this.adminTeatroService.listarFunciones().subscribe((resultado) => {
      this.funciones = resultado.funciones;
      this.dataSource = new MatTableDataSource(resultado.funciones);
    });
  }

  agregar(data: any) {
    let sala: Sala = {
      codigo: 0,
      nombre: '',
      distribucionSillas: {
        codigo: 0,
        columnas: 0,
        esquema: '',
        filas: 0,
        total_sillas: 0,
      },
      teatro: {
        ciudad: {
          codigo: 0,
          nombre: '',
        },
        codigo: 0,
        direccion: '',
        salas: [],
        telefono: '',
      },
    };

    let horario: Horario = {
      codigo: 0,
      dia: '',
      hora: new Date(),
      fecha_fin: new Date(),
      fecha_inicio: new Date(),
    };

    let genero!: Genero;

    let pelicula: Pelicula = {
      codigo: 0,
      estado: false,
      genero: genero,
      imagen: {
        codigo: 0,
        imagenId: '',
        imagenUrl: '',
        nombre: '',
      },
      nombre: '',
      reparto: '',
      sinopsis: '',
      url_trailer: '',
    };

    let codigo = 0;
    let precio = 0;

    let dialogRef: any = null;

    if (!data) {
      dialogRef = this.dialog.open(AgregarFuncionComponent, {
        width: '50%',
        data: {
          precio: precio,
          codigo: codigo,
          pelicula: pelicula,
          horario: horario,
          sala: sala,
        },
      });
    } else {
      dialogRef = this.dialog.open(AgregarFuncionComponent, {
        width: '50%',
        data: {
          precio: data.precio,
          codigo: data.codigo,
          pelicula: data.pelicula,
          horario: data.horario,
          sala: data.sala,
        },
      });
    }

    dialogRef.afterClosed().subscribe((result: Funcion) => {
      if (!result) {
        return;
      }
      this.adminTeatroService.agregarFuncion(result).subscribe({
        next: (resp: any) => {
          this.ngOnInit();
          let dialog: Dialog = {
            titulo: 'Crear funcion',
            descripcion: resp.mensaje,
            icono: 'done',
            estado: false,
          };

          this.abrirDialog(dialog);
        },
        error: (err) => {
          this._snackBar.open(`${err.error.error}`, 'Aceptar', {
            duration: 7000,
          });
          this.agregar(result);
        },
      });
    });
  }

  editar(data: any) {
    let dialogRef: any = null;
    if (this.selection.selected.length == 1) {
      this.funcionSeleccionada = this.selection.selected[0];
      if (!data) {
        dialogRef = this.dialog.open(AgregarFuncionComponent, {
          width: '50%',
          data: {
            codigo: this.funcionSeleccionada.codigo,
            precio: this.funcionSeleccionada.precio,
            sala: this.funcionSeleccionada.sala,
            pelicula: this.funcionSeleccionada.pelicula,
            horario: this.funcionSeleccionada.codigo,
          },
        });
      } else {
        dialogRef = this.dialog.open(AgregarFuncionComponent, {
          width: '50%',
          data: {
            codigo: data.codigo,
            precio: data.precio,
            sala: data.sala,
            pelicula: data.pelicula,
            horario: data.codigo,
          },
        });
      }

      dialogRef.afterClosed().subscribe((result: Funcion) => {
        if (!result) {
          return;
        }
        this.adminTeatroService.editarFuncion(result).subscribe({
          next: (resp: any) => {
            let dialog: Dialog = {
              titulo: 'Actualizar funcion',
              icono: 'done',
              descripcion: resp.mensaje,
              estado: false,
            };
            this.abrirDialog(dialog);
            this.ngOnInit();
            this.selection.clear();
          },
          error: (err) => {
            this._snackBar.open(`${err.error.error}`, 'Aceptar', {
              duration: 7000,
            });
            this.editar(result);
          },
        });
      });
    } else {
      let dialog: Dialog = {
        titulo: 'Error al editar la funcion',
        descripcion: 'Debe seleccionar una funcion',
        icono: 'error',
        estado: false,
      };

      this.abrirDialog(dialog);
    }
  }

  eliminar() {
    let ids_funciones: number[] = [];
    this.selection.selected.map((element) => {
      ids_funciones.push(element.codigo);
    });

    if (ids_funciones.length == 0) {
      let dialog: Dialog = {
        titulo: 'Error al eliminar la funcion',
        descripcion: 'Debe seleccionar una funcion',
        estado: false,
        icono: 'error',
      };

      this.abrirDialog(dialog);
      return;
    }

    const dialogRef = this.dialog.open(EliminarFuncionComponent, {
      width: '35%',
      data: { estadoConfirmacion: false },
    });

    dialogRef.afterClosed().subscribe((estadoConfirmacion: Boolean) => {
      if (estadoConfirmacion) {
        this.adminTeatroService.eliminarFunciones(ids_funciones).subscribe({
          next: (resp) => {
            let dialog: Dialog = {
              titulo: 'Eliminar funcion',
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

  checkboxLabel(row?: Funcion): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.codigo + 1
    }`;
  }
}
