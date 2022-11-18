import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarDistribucionSillaComponent } from '../../components/agregar-distribucion-silla/agregar-distribucion-silla.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { EliminarDistribucionSillasComponent } from '../../components/eliminar-distribucion-sillas/eliminar-distribucion-sillas.component';
import { Dialog, DistribucionSillas } from '../../interfaces/admin.interface';
import { AdminTeatroService } from '../../services/admin-teatro.service';

@Component({
  selector: 'app-distribuciones-sillas',
  templateUrl: './distribuciones-sillas.component.html',
  styleUrls: ['./distribuciones-sillas.component.css'],
})
export class DistribucionesSillasComponent implements OnInit {
  distribucionSeleccionada!: DistribucionSillas;
  distribucionesSillas: DistribucionSillas[] = [];
  displayedColumns: string[] = [
    'select',
    'codigo',
    'esquema',
    'total_sillas',
    'filas',
    'columnas',
  ];

  dataSource!: MatTableDataSource<DistribucionSillas>;
  selection = new SelectionModel<DistribucionSillas>(true, []);

  constructor(
    private adminTeatroService: AdminTeatroService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.buscarDistribuciones();
  }

  buscarDistribuciones() {
    this.adminTeatroService
      .listarDistribucionSillas()
      .subscribe((resultado) => {
        this.distribucionesSillas = resultado.distribucion;
        this.dataSource = new MatTableDataSource(resultado.distribucion);
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

    const dialogRef = this.dialog.open(AgregarDistribucionSillaComponent, {
      width: '50%',
      data: {
        columnas: dist.columnas,
        codigo: dist.codigo,
        esquema: dist.esquema,
        filas: dist.filas,
        total_sillas: dist.total_sillas,
      },
    });

    dialogRef.afterClosed().subscribe((result: DistribucionSillas) => {
      if (!result) {
        return;
      }
      this.adminTeatroService.agregarDistribucionSillas(result).subscribe({
        next: (resp: any) => {
          this.ngOnInit();
          let dialog: Dialog = {
            titulo: 'Crear distribucion de sillas',
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
      this.distribucionSeleccionada = this.selection.selected[0];
      console.log(this.distribucionSeleccionada.total_sillas);
      const dialogRef = this.dialog.open(AgregarDistribucionSillaComponent, {
        width: '50%',
        data: {
          codigo: this.distribucionSeleccionada.codigo,
          esquema: this.distribucionSeleccionada.esquema,
          filas: this.distribucionSeleccionada.filas,
          columnas: this.distribucionSeleccionada.columnas,
          total_sillas: this.distribucionSeleccionada.total_sillas,
        },
      });

      dialogRef.afterClosed().subscribe((result: DistribucionSillas) => {
        if (!result) {
          return;
        }
        this.adminTeatroService.editarDistribucionSillas(result).subscribe({
          next: (resp: any) => {
            let dialog: Dialog = {
              titulo: 'Actualizar distribucion de sillas',
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
        titulo: 'Error al editar la distribucion de sillas',
        descripcion: 'Debe seleccionar una distribucion de sillas',
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
        titulo: 'Error al eliminar la distribucion de sillas',
        descripcion: 'Debe seleccionar una distribucion de sillas',
        estado: false,
        icono: 'error',
      };

      this.abrirDialog(dialog);
      return;
    }

    const dialogRef = this.dialog.open(EliminarDistribucionSillasComponent, {
      width: '35%',
      data: { estadoConfirmacion: false },
    });

    dialogRef.afterClosed().subscribe((estadoConfirmacion: Boolean) => {
      if (estadoConfirmacion) {
        this.adminTeatroService
          .eliminarDistribucionSillas(ids_salas)
          .subscribe({
            next: (resp) => {
              let dialog: Dialog = {
                titulo: 'Eliminar distribucion de sillas',
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

  checkboxLabel(row?: DistribucionSillas): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.codigo + 1
    }`;
  }
}
