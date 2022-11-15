import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarSalaComponent } from '../../components/agregar-sala/agregar-sala.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { EliminarSalaComponent } from '../../components/eliminar-sala/eliminar-sala.component';
import {
  Dialog,
  DistribucionSillas,
  Sala,
  Teatro,
} from '../../interfaces/admin.interface';
import { AdminTeatroService } from '../../services/admin-teatro.service';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css'],
})
export class SalasComponent implements OnInit {
  salaSeleccionado!: Sala;
  salas: Sala[] = [];
  displayedColumns: string[] = [
    'select',
    'codigo',
    'nombre',
    'teatro',
    'distribucionSillas',
  ];

  dataSource!: MatTableDataSource<Sala>;
  selection = new SelectionModel<Sala>(true, []);

  constructor(
    private adminTeatroService: AdminTeatroService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.buscarSalas();
  }

  buscarSalas() {
    this.adminTeatroService.listarSalas().subscribe((resultado) => {
      this.salas = resultado.salas;
      this.dataSource = new MatTableDataSource(resultado.salas);
    });
  }

  agregar() {
    let dist: DistribucionSillas = {
      codigo: 0,
      columnas: 0,
      esquema: '',
      filas: 0,
      total_sillas: 0,
    };

    let teatro: Teatro = {
      ciudad: {
        codigo: 0,
        nombre: '',
      },
      codigo: 0,
      direccion: '',
      salas: [],
      telefono: '',
    };

    let codigo = 0;
    let nombre = '';

    const dialogRef = this.dialog.open(AgregarSalaComponent, {
      width: '50%',
      data: {
        nombre: nombre,
        codigo: codigo,
        distribucionSillas: dist,
        teatro: teatro,
      },
    });

    dialogRef.afterClosed().subscribe((result: Sala) => {
      if (!result) {
        return;
      }
      this.adminTeatroService.agregarSala(result).subscribe({
        next: (resp: any) => {
          this.ngOnInit();
          let dialog: Dialog = {
            titulo: 'Crear sala',
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

  editar() {
    if (this.selection.selected.length == 1) {
      this.salaSeleccionado = this.selection.selected[0];
      const dialogRef = this.dialog.open(AgregarSalaComponent, {
        width: '50%',
        data: {
          codigo: this.salaSeleccionado.codigo,
          nombre: this.salaSeleccionado.nombre,
          distribucionSillas: this.salaSeleccionado.distribucionSillas,
          teatro: this.salaSeleccionado.teatro,
        },
      });

      dialogRef.afterClosed().subscribe((result: Sala) => {
        if (!result) {
          return;
        }
        this.adminTeatroService.editarSala(result).subscribe({
          next: (resp: any) => {
            let dialog: Dialog = {
              titulo: 'Actualizar sala',
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
        titulo: 'Error al editar la sala',
        descripcion: 'Debe seleccionar una sala',
        icono: 'error',
        estado: false,
      };

      this.abrirDialog(dialog);
    }
  }

  eliminar() {
    let ids_salas: number[] = [];
    this.selection.selected.map((element) => {
      ids_salas.push(element.codigo);
    });

    if (ids_salas.length == 0) {
      let dialog: Dialog = {
        titulo: 'Error al eliminar la sala',
        descripcion: 'Debe seleccionar un teatro',
        estado: false,
        icono: 'error',
      };

      this.abrirDialog(dialog);
      return;
    }

    const dialogRef = this.dialog.open(EliminarSalaComponent, {
      width: '35%',
      data: { estadoConfirmacion: false },
    });

    dialogRef.afterClosed().subscribe((estadoConfirmacion: Boolean) => {
      if (estadoConfirmacion) {
        this.adminTeatroService.eliminarSalas(ids_salas).subscribe({
          next: (resp) => {
            let dialog: Dialog = {
              titulo: 'Eliminar sala',
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

  checkboxLabel(row?: Sala): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.codigo + 1
    }`;
  }
}
