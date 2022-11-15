import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarConfiteriaComponent } from '../../components/agregar-confiteria/agregar-confiteria.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { EliminarConfiteriaComponent } from '../../components/eliminar-confiteria/eliminar-confiteria.component';
import {
  Confiteria,
  ConfiteriaFile,
  Dialog,
  Imagen,
} from '../../interfaces/admin.interface';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-confiteria',
  templateUrl: './confiteria.component.html',
  styleUrls: ['./confiteria.component.css'],
})
export class ConfiteriaComponent implements OnInit {
  confiterias: Confiteria[] = [];
  displayedColumns: string[] = [
    'select',
    'codigo',
    'nombre',
    'precio',
    'descripcion',
    'imagen',
  ];
  dataSource!: MatTableDataSource<Confiteria>;
  selection = new SelectionModel<Confiteria>(true, []);

  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.adminService.listarConfiterias().subscribe((resultado) => {
      this.confiterias = resultado.confiterias;
      this.dataSource = new MatTableDataSource(resultado.confiterias);
    });
  }

  agregar() {
    let nombre: string = '';
    let descripcion: string = '';
    let precio: number = 0;
    let imagen: Imagen = {
      codigo: 0,
      imagenId: '',
      imagenUrl: '',
      nombre: '',
    };

    let imagenFile!: File;

    const dialogRef = this.dialog.open(AgregarConfiteriaComponent, {
      width: '50%',
      data: {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        imagen: imagen,
        imagenFile: imagenFile,
      },
    });

    dialogRef.afterClosed().subscribe((result: ConfiteriaFile) => {
      if (!result) {
        return;
      }
      this.adminService.agregarConfiteria(result).subscribe({
        next: (resp: any) => {
          let dialog: Dialog = {
            titulo: 'Crear confiteria',
            descripcion: resp.mensaje,
            icono: 'done',
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
          this.ngOnInit();
          this.selection.clear();
        },
      });
    });
  }

  editar() {
    let codigo: number = 0;
    let nombre: string = '';
    let precio: number = 0;
    let descripcion: string = '';
    let imagen!: Imagen;

    if (this.selection.selected.length == 1) {
      let confiteria: Confiteria = this.selection.selected[0];
      nombre = confiteria.nombre;
      precio = confiteria.precio;
      descripcion = confiteria.descripcion;
      imagen = confiteria.imagen;
      codigo = confiteria.codigo;

      const dialogRef = this.dialog.open(AgregarConfiteriaComponent, {
        width: '50%',
        data: {
          nombre: nombre,
          precio: precio,
          descripcion: descripcion,
          imagen: imagen,
          codigo: codigo,
        },
      });

      dialogRef.afterClosed().subscribe((result: ConfiteriaFile) => {
        if (!result) {
          return;
        }
        this.adminService.editarConfiteria(result).subscribe({
          next: (resp: any) => {
            let dialog: Dialog = {
              titulo: 'Actualizar confiteria',
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
        titulo: 'Error al editar la confiteria',
        descripcion: 'Debe seleccionar una confiteria',
        icono: 'error',
        estado: false,
      };

      this.abrirDialog(dialog);
    }
  }

  eliminar() {
    let ids_confiterias: number[] = [];
    this.selection.selected.map((element) => {
      ids_confiterias.push(element.codigo);
    });

    if (ids_confiterias.length == 0) {
      let dialog: Dialog = {
        titulo: 'Error al eliminar la confiteria',
        descripcion: 'Debe seleccionar una confiteria',
        estado: false,
        icono: 'error',
      };

      this.abrirDialog(dialog);
      return;
    }

    const dialogRef = this.dialog.open(EliminarConfiteriaComponent, {
      width: '35%',
      data: { estadoConfirmacion: false },
    });

    dialogRef.afterClosed().subscribe((estadoConfirmacion: Boolean) => {
      if (estadoConfirmacion) {
        this.adminService.eliminarConfiteria(ids_confiterias).subscribe({
          next: (resp) => {
            let dialog: Dialog = {
              titulo: 'Eliminar confiteria',
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

  checkboxLabel(row?: Confiteria): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.codigo + 1
    }`;
  }
}
