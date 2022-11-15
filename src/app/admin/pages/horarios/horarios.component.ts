import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarHorarioComponent } from '../../components/agregar-horario/agregar-horario.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { EliminarHorarioComponent } from '../../components/eliminar-horario/eliminar-horario.component';
import { Dialog, Horario } from '../../interfaces/admin.interface';
import { AdminTeatroService } from '../../services/admin-teatro.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css'],
})
export class HorariosComponent implements OnInit {
  horarioSeleccionado!: Horario;
  horarios: Horario[] = [];
  displayedColumns: string[] = [
    'select',
    'codigo',
    'dia',
    'hora',
    'fecha_inicio',
    'fecha_fin',
  ];

  dataSource!: MatTableDataSource<Horario>;
  selection = new SelectionModel<Horario>(true, []);

  constructor(
    private adminTeatroService: AdminTeatroService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.buscarHorarios();
  }

  buscarHorarios() {
    this.adminTeatroService.listarHorarios().subscribe((resultado) => {
      this.horarios = resultado.horarios;
      this.dataSource = new MatTableDataSource(resultado.horarios);
    });
  }

  agregar(data: any) {
    let codigo = 0;
    let dia = '';
    let hora = new Date();
    let fecha_inicio = new Date();
    let fecha_fin = new Date();

    let dialogRef: any = null;

    if (!data) {
      dialogRef = this.dialog.open(AgregarHorarioComponent, {
        width: '50%',
        data: {
          dia: dia,
          codigo: codigo,
          hora: hora,
          fecha_inicio: fecha_inicio,
          fecha_fin: fecha_fin,
        },
      });
    } else {
      dialogRef = this.dialog.open(AgregarHorarioComponent, {
        width: '50%',
        data: {
          dia: data.dia,
          codigo: data.codigo,
          hora: data.hora,
          fecha_inicio: data.fecha_inicio,
          fecha_fin: data.fecha_fin,
        },
      });
    }

    dialogRef.afterClosed().subscribe((result: Horario) => {
      if (!result) {
        return;
      }
      this.adminTeatroService.agregarHorario(result).subscribe({
        next: (resp: any) => {
          this.ngOnInit();
          let dialog: Dialog = {
            titulo: 'Crear horario',
            descripcion: resp.mensaje,
            icono: 'done',
            estado: false,
          };

          this.abrirDialog(dialog);
        },
        error: (err) => {
          this._snackBar.open(`${err.error.error}`, 'Aceptar', {
            duration: 5000,
          });
          this.agregar(result);
        },
      });
    });
  }

  editar(data: any) {
    let dialogRef: any = null;
    if (this.selection.selected.length == 1) {
      this.horarioSeleccionado = this.selection.selected[0];
      if (!data) {
        dialogRef = this.dialog.open(AgregarHorarioComponent, {
          width: '50%',
          data: {
            codigo: this.horarioSeleccionado.codigo,
            hora: this.horarioSeleccionado.hora,
            dia: this.horarioSeleccionado.dia,
            fecha_inicio: this.horarioSeleccionado.fecha_inicio,
            fecha_fin: this.horarioSeleccionado.fecha_fin,
          },
        });
      } else {
        dialogRef = this.dialog.open(AgregarHorarioComponent, {
          width: '50%',
          data: {
            codigo: data.codigo,
            hora: data.hora,
            dia: data.dia,
            fecha_inicio: data.fecha_inicio,
            fecha_fin: data.fecha_fin,
          },
        });
      }

      dialogRef.afterClosed().subscribe((result: Horario) => {
        if (!result) {
          return;
        }
        this.adminTeatroService.editarHorario(result).subscribe({
          next: (resp: any) => {
            let dialog: Dialog = {
              titulo: 'Actualizar horario',
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
              duration: 5000,
            });
            this.editar(result);
          },
        });
      });
    } else {
      let dialog: Dialog = {
        titulo: 'Error al editar el horario',
        descripcion: 'Debe seleccionar el horario',
        icono: 'error',
        estado: false,
      };

      this.abrirDialog(dialog);
    }
  }

  eliminar() {
    let ids_horarios: number[] = [];
    this.selection.selected.map((element) => {
      ids_horarios.push(element.codigo);
    });

    if (ids_horarios.length == 0) {
      let dialog: Dialog = {
        titulo: 'Error al eliminar el horario',
        descripcion: 'Debe seleccionar un horario',
        estado: false,
        icono: 'error',
      };

      this.abrirDialog(dialog);
      return;
    }

    const dialogRef = this.dialog.open(EliminarHorarioComponent, {
      width: '35%',
      data: { estadoConfirmacion: false },
    });

    dialogRef.afterClosed().subscribe((estadoConfirmacion: Boolean) => {
      if (estadoConfirmacion) {
        this.adminTeatroService.eliminarHorarios(ids_horarios).subscribe({
          next: (resp) => {
            let dialog: Dialog = {
              titulo: 'Eliminar horario',
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

  checkboxLabel(row?: Horario): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.codigo + 1
    }`;
  }
}
