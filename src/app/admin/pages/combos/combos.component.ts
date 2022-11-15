import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarComboComponent } from '../../components/agregar-combo/agregar-combo.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { EliminarComboComponent } from '../../components/eliminar-combo/eliminar-combo.component';
import {
  Combo,
  ComboFile,
  Dialog,
  Imagen,
} from '../../interfaces/admin.interface';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.css'],
})
export class CombosComponent implements OnInit {
  combos: Combo[] = [];
  displayedColumns: string[] = [
    'select',
    'codigo',
    'nombre',
    'precio',
    'descripcion',
    'imagen',
  ];

  dataSource!: MatTableDataSource<Combo>;
  selection = new SelectionModel<Combo>(true, []);

  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.adminService.listarCombos().subscribe((resultado) => {
      this.combos = resultado.combos;
      this.dataSource = new MatTableDataSource(resultado.combos);
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

    const dialogRef = this.dialog.open(AgregarComboComponent, {
      width: '50%',
      data: {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        imagen: imagen,
        imagenFile: imagenFile,
      },
    });

    dialogRef.afterClosed().subscribe((result: ComboFile) => {
      if (!result) {
        return;
      }
      this.adminService.agregarCombo(result).subscribe({
        next: (resp: any) => {
          let dialog: Dialog = {
            titulo: 'Crear combo',
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
      let combo: Combo = this.selection.selected[0];
      nombre = combo.nombre;
      precio = combo.precio;
      descripcion = combo.descripcion;
      imagen = combo.imagen;
      codigo = combo.codigo;

      const dialogRef = this.dialog.open(AgregarComboComponent, {
        width: '50%',
        data: {
          nombre: nombre,
          precio: precio,
          descripcion: descripcion,
          imagen: imagen,
          codigo: codigo,
        },
      });

      dialogRef.afterClosed().subscribe((result: ComboFile) => {
        if (!result) {
          return;
        }
        this.adminService.editarCombo(result).subscribe({
          next: (resp: any) => {
            let dialog: Dialog = {
              titulo: 'Actualizar combo',
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
        titulo: 'Error al editar el combo',
        descripcion: 'Debe seleccionar un combo',
        icono: 'error',
        estado: false,
      };

      this.abrirDialog(dialog);
    }
  }

  eliminar() {
    let ids_combos: number[] = [];
    this.selection.selected.map((element) => {
      ids_combos.push(element.codigo);
    });

    if (ids_combos.length == 0) {
      let dialog: Dialog = {
        titulo: 'Error al eliminar el combo',
        descripcion: 'Debe seleccionar un combo',
        estado: false,
        icono: 'error',
      };

      this.abrirDialog(dialog);
      return;
    }

    const dialogRef = this.dialog.open(EliminarComboComponent, {
      width: '35%',
      data: { estadoConfirmacion: false },
    });

    dialogRef.afterClosed().subscribe((estadoConfirmacion: Boolean) => {
      if (estadoConfirmacion) {
        this.adminService.eliminarCombo(ids_combos).subscribe({
          next: (resp) => {
            let dialog: Dialog = {
              titulo: 'Eliminar combo',
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

  checkboxLabel(row?: Combo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.codigo + 1
    }`;
  }
}
