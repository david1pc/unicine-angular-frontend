import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarTeatroComponent } from '../../components/agregar-teatro/agregar-teatro.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { EliminarTeatroComponent } from '../../components/eliminar-teatro/eliminar-teatro.component';
import { Ciudad, Dialog, Teatro } from '../../interfaces/admin.interface';
import { AdminTeatroService } from '../../services/admin-teatro.service';

@Component({
  selector: 'app-teatros',
  templateUrl: './teatros.component.html',
  styleUrls: ['./teatros.component.css'],
})
export class TeatrosComponent implements OnInit {
  teatroSeleccionado!: Teatro;
  teatros: Teatro[] = [];
  displayedColumns: string[] = [
    'select',
    'codigo',
    'direccion',
    'telefono',
    'administradorTeatro',
    'ciudad',
  ];

  dataSource!: MatTableDataSource<Teatro>;
  selection = new SelectionModel<Teatro>(true, []);

  constructor(
    private adminTeatroService: AdminTeatroService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.buscarTeatros();
  }

  buscarTeatros() {
    this.adminTeatroService.listarTeatros().subscribe((resultado) => {
      this.teatros = resultado.teatros;
      this.dataSource = new MatTableDataSource(resultado.teatros);
    });
  }

  agregar() {
    let ciudad: Ciudad = {
      codigo: 0,
      nombre: '',
    };

    let codigo = 0;
    let direccion = '';
    let telefono = '';

    const dialogRef = this.dialog.open(AgregarTeatroComponent, {
      width: '50%',
      data: {
        ciudad: ciudad,
        codigo: codigo,
        direccion: direccion,
        telefono: telefono,
      },
    });

    dialogRef.afterClosed().subscribe((result: Teatro) => {
      if (!result) {
        return;
      }
      this.adminTeatroService.agregarTeatro(result).subscribe({
        next: (resp: any) => {
          this.ngOnInit();
          let dialog: Dialog = {
            titulo: 'Crear teatro',
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
      this.teatroSeleccionado = this.selection.selected[0];
      const dialogRef = this.dialog.open(AgregarTeatroComponent, {
        width: '50%',
        data: {
          ciudad: this.teatroSeleccionado.ciudad,
          direccion: this.teatroSeleccionado.direccion,
          telefono: this.teatroSeleccionado.telefono,
          administradorTeatro: this.teatroSeleccionado.administradorTeatro,
          codigo: this.teatroSeleccionado.codigo,
        },
      });

      dialogRef.afterClosed().subscribe((result: Teatro) => {
        if (!result) {
          return;
        }
        this.adminTeatroService.editarTeatroExistente(result).subscribe({
          next: (resp: any) => {
            let dialog: Dialog = {
              titulo: 'Actualizar teatro',
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
        titulo: 'Error al editar el teatro',
        descripcion: 'Debe seleccionar un teatro',
        icono: 'error',
        estado: false,
      };

      this.abrirDialog(dialog);
    }
  }

  eliminar() {
    let ids_teatros: number[] = [];
    this.selection.selected.map((element) => {
      ids_teatros.push(element.codigo);
    });

    if (ids_teatros.length == 0) {
      let dialog: Dialog = {
        titulo: 'Error al eliminar el teatro',
        descripcion: 'Debe seleccionar un teatro',
        estado: false,
        icono: 'error',
      };

      this.abrirDialog(dialog);
      return;
    }

    const dialogRef = this.dialog.open(EliminarTeatroComponent, {
      width: '35%',
      data: { estadoConfirmacion: false },
    });

    dialogRef.afterClosed().subscribe((estadoConfirmacion: Boolean) => {
      if (estadoConfirmacion) {
        this.adminTeatroService.eliminarTeatros(ids_teatros).subscribe({
          next: (resp) => {
            let dialog: Dialog = {
              titulo: 'Eliminar teatro',
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

  checkboxLabel(row?: Teatro): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.codigo + 1
    }`;
  }
}
