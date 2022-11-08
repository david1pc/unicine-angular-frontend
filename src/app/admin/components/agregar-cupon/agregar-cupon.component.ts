import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cupon, Pelicula } from '../../interfaces/admin.interface';

@Component({
  selector: 'app-agregar-cupon',
  templateUrl: './agregar-cupon.component.html',
  styleUrls: ['./agregar-cupon.component.css'],
})
export class AgregarCuponComponent implements OnInit {
  descuentoControl: FormControl = new FormControl(1, [
    Validators.required,
    Validators.min(1),
  ]);
  generos: String[] = [];
  generoSeleccionado!: String;

  validarDescuento() {
    return this.descuentoControl.errors && this.descuentoControl.touched;
  }

  constructor(
    public dialogRef: MatDialogRef<AgregarCuponComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cupon
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
