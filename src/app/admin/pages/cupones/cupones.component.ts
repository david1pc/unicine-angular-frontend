import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarCuponComponent } from '../../components/agregar-cupon/agregar-cupon.component';
import { EliminarCuponComponent } from '../../components/eliminar-cupon/eliminar-cupon.component';
import { Cupon, Pelicula } from '../../interfaces/admin.interface';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.component.html',
  styleUrls: ['./cupones.component.css'],
})
export class CuponesComponent implements OnInit {
  cupones: Cupon[] = [];
  displayedColumns: string[] = [
    'select',
    'codigo',
    'descripcion',
    'descuento',
    'criterio',
    'vencimiento',
  ];

  dataSource!: MatTableDataSource<Cupon>;
  selection = new SelectionModel<Cupon>(true, []);

  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.adminService.listarCupones().subscribe((resultado) => {
      this.cupones = resultado.cupones;
      this.dataSource = new MatTableDataSource(resultado.cupones);
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
    let descripcion: string = '';
    let descuento: number = 0;
    let criterio: string = '';
    let vencimiento!: Date;

    const dialogRef = this.dialog.open(AgregarCuponComponent, {
      width: '50%',
      data: {
        descripcion: descripcion,
        descuento: descuento,
        criterio: criterio,
        vencimiento: vencimiento,
      },
    });

    dialogRef.afterClosed().subscribe((result: Cupon) => {
      this.adminService.agregarCupon(result).subscribe((resp) => {
        this.ngOnInit();
      });
    });
  }

  editar() {
    let codigo: number = 0;
    let descripcion: string = '';
    let descuento: number = 0;
    let vencimiento!: Date;
    let criterio: string = '';

    if (this.selection.selected.length == 1) {
      let cupon: Cupon = this.selection.selected[0];

      descripcion = cupon.descripcion;
      descuento = cupon.descuento;
      vencimiento = cupon.vencimiento;
      criterio = cupon.criterio;
      codigo = cupon.codigo;

      const dialogRef = this.dialog.open(AgregarCuponComponent, {
        width: '50%',
        data: {
          descripcion: descripcion,
          descuento: descuento,
          vencimiento: vencimiento,
          criterio: criterio,
          codigo: codigo,
        },
      });

      dialogRef.afterClosed().subscribe((result: Cupon) => {
        this.adminService.editarCupon(result).subscribe((resp) => {
          this.ngOnInit();
          this.selection.clear();
        });
      });
    }
  }

  eliminar() {
    let ids_cupones: number[] = [];
    this.selection.selected.map((element) => {
      ids_cupones.push(element.codigo);
    });

    console.log(ids_cupones);

    const dialogRef = this.dialog.open(EliminarCuponComponent, {
      width: '35%',
      data: { estadoConfirmacion: false },
    });

    dialogRef.afterClosed().subscribe((estadoConfirmacion: Boolean) => {
      if (estadoConfirmacion) {
        this.adminService.eliminarCupon(ids_cupones).subscribe((resp) => {
          this.ngOnInit();
          this.selection.clear();
        });
      }
    });
  }

  checkboxLabel(row?: Cupon): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.codigo + 1
    }`;
  }
}
