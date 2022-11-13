import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Rol } from 'src/app/auth/interfaces/cliente.interface';
import { AgregarAdminTeatroComponent } from '../../components/agregar-admin-teatro/agregar-admin-teatro.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { AdministradorTeatro, Dialog } from '../../interfaces/admin.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../services/admin.service';
import { EliminarAdminTeatroComponent } from '../../components/eliminar-admin-teatro/eliminar-admin-teatro.component';

@Component({
  selector: 'app-admin-teatro',
  templateUrl: './admin-teatro.component.html',
  styleUrls: ['./admin-teatro.component.css'],
})
export class AdminTeatroComponent implements OnInit {
  duracionMsjSegundos: number = 5;
  admins_teatro: AdministradorTeatro[] = [];
  displayedColumns: string[] = [
    'select',
    'codigo',
    'primerNombre',
    'segundoNombre',
    'primerApellido',
    'segundoApellido',
    'correo',
    'username',
  ];

  dataSource!: MatTableDataSource<AdministradorTeatro>;
  selection = new SelectionModel<AdministradorTeatro>(true, []);

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.adminService.listarAdminTeatros().subscribe((resultado: any) => {
      this.admins_teatro = resultado.admins_teatro;
      this.dataSource = new MatTableDataSource(resultado.admins_teatro);
    });
  }

  agregar(data: any) {
    let primerNombre: string = '';
    let segundoNombre: string = '';
    let primerApellido: string = '';
    let segundoApellido: string = '';
    let correo: string = '';
    let username: string = '';
    let password: string = '';
    let rol: Rol = {
      nombre: 'ROLE_ADMIN_TEATRO',
      codigo: 3,
    };

    let dialogRef: any = null;

    if (!data) {
      dialogRef = this.dialog.open(AgregarAdminTeatroComponent, {
        width: '50%',
        data: {
          primerNombre: primerNombre,
          primerApellido: primerApellido,
          segundoNombre: segundoNombre,
          segundoApellido: segundoApellido,
          correo: correo,
          username: username,
          rol: rol,
          password: password,
        },
      });
    } else {
      dialogRef = this.dialog.open(AgregarAdminTeatroComponent, {
        width: '50%',
        data: {
          primerNombre: data.primerNombre,
          primerApellido: data.primerApellido,
          segundoNombre: data.segundoNombre,
          segundoApellido: data.segundoApellido,
          correo: data.correo,
          username: data.username,
          rol: data.rol,
          password: data.password,
        },
      });
    }

    dialogRef.afterClosed().subscribe((result: any) => {
      this.adminService.agregarAdminTeatro(result).subscribe({
        next: (resp: any) => {
          this.ngOnInit();
          let dialog: Dialog = {
            titulo: 'Crear administrador teatro',
            icono: 'done',
            descripcion: resp.mensaje,
            estado: false,
          };

          this.abrirDialog(dialog);
        },
        error: (err) => {
          this._snackBar.open(`${err.error.error}`, 'Aceptar', {
            duration: this.duracionMsjSegundos * 1000,
          });
          this.agregar(result);
        },
      });
    });
  }

  editar(data: any) {
    let dialogRef: any = null;

    if (this.selection.selected.length == 1) {
      let adminTeatro: AdministradorTeatro = this.selection.selected[0];
      if (!data) {
        dialogRef = this.dialog.open(AgregarAdminTeatroComponent, {
          width: '50%',
          data: {
            primerNombre: adminTeatro.primerNombre,
            primerApellido: adminTeatro.primerApellido,
            segundoNombre: adminTeatro.segundoNombre,
            segundoApellido: adminTeatro.segundoApellido,
            correo: adminTeatro.correo,
            username: adminTeatro.username,
            rol: adminTeatro.rol,
            password: adminTeatro.password,
            codigo: adminTeatro.codigo,
          },
        });
      } else {
        dialogRef = this.dialog.open(AgregarAdminTeatroComponent, {
          width: '50%',
          data: {
            primerNombre: data.primerNombre,
            primerApellido: data.primerApellido,
            segundoNombre: data.segundoNombre,
            segundoApellido: data.segundoApellido,
            correo: data.correo,
            username: data.username,
            rol: data.rol,
            password: data.password,
            codigo: data.codigo,
          },
        });
      }
      dialogRef.afterClosed().subscribe((result: any) => {
        this.adminService.editarAdminTeatro(result).subscribe({
          next: (resp: any) => {
            this.ngOnInit();
            let dialog: Dialog = {
              titulo: 'Editar administrador teatro',
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
              duration: this.duracionMsjSegundos * 1000,
            });
            this.editar(result);
          },
        });
      });
    } else {
      let dialog: Dialog = {
        titulo: 'Error al editar el admin teatro',
        descripcion: 'Debe seleccionar una admin teatro',
        icono: 'error',
        estado: false,
      };

      this.abrirDialog(dialog);
    }
  }

  eliminar() {
    let ids_admins_teatro: number[] = [];
    this.selection.selected.map((element) => {
      ids_admins_teatro.push(element.codigo);
    });

    if (ids_admins_teatro.length == 0) {
      let dialog: Dialog = {
        titulo: 'Error al eliminar el administrador teatro',
        descripcion: 'Debe seleccionar un administrador de teatro',
        estado: false,
        icono: 'error',
      };

      this.abrirDialog(dialog);
      return;
    }

    const dialogRef = this.dialog.open(EliminarAdminTeatroComponent, {
      width: '35%',
      data: { estadoConfirmacion: false },
    });

    dialogRef.afterClosed().subscribe((estadoConfirmacion: Boolean) => {
      if (estadoConfirmacion) {
        this.adminService.eliminarAdminTeatro(ids_admins_teatro).subscribe({
          next: (resp) => {
            let dialog: Dialog = {
              titulo: 'Eliminar administrador teatro',
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

  checkboxLabel(row?: AdministradorTeatro): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.codigo + 1
    }`;
  }
}
