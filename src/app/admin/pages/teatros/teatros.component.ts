import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { Dialog, Teatro } from '../../interfaces/admin.interface';
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

  tabs = ['Ver teatros', 'Teatro'];
  selected: number = 0;

  dataSource!: MatTableDataSource<Teatro>;
  selection = new SelectionModel<Teatro>(true, []);

  constructor(
    private adminTeatroService: AdminTeatroService,
    public dialog: MatDialog
  ) {
    this.adminTeatroService.ultimaSeleccion.subscribe((seleccion) => {
      if (seleccion != this.selected) {
        this.selected = seleccion;
        this.buscarTeatros();
      }
      this.buscarTeatros();
    });
  }

  ngOnInit(): void {}

  buscarTeatros() {
    this.adminTeatroService.listarTeatros().subscribe((resultado) => {
      this.teatros = resultado.teatros;
      this.dataSource = new MatTableDataSource(resultado.teatros);
    });
  }

  actualizarSeleccion(event: any) {
    this.selected = 0;
  }

  agregar() {
    this.selected = 1;
  }

  editar() {
    if (this.selection.selected.length == 1) {
      this.teatroSeleccionado = this.selection.selected[0];
      this.selected = 1;
      this.adminTeatroService.cambiarEdicionTeatro(this.teatroSeleccionado);
    } else {
      let dialog: Dialog = {
        titulo: 'Error al editar el teatro',
        descripcion: 'Debe seleccionar un teatro',
        icono: 'error',
        estado: false,
      };

      this.abrirDialog(dialog);
    }

    this.selection.clear();
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
  saludar() {
    console.log('holaa');
  }

  eliminar() {}

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
