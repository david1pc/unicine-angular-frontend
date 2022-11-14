import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AdministradorTeatro,
  Ciudad,
  Teatro,
} from '../../interfaces/admin.interface';
import { AdminTeatroService } from '../../services/admin-teatro.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-agregar-teatro',
  templateUrl: './agregar-teatro.component.html',
  styleUrls: ['./agregar-teatro.component.css'],
})
export class AgregarTeatroComponent implements OnInit {
  teatro!: Teatro;
  ciudades!: Ciudad[];
  administradoresTeatro!: AdministradorTeatro[];
  ciudadSelec!: Ciudad;
  adminTeatroSelec!: AdministradorTeatro | undefined;

  isLinear = false;
  adminTeatroFormGroup!: FormGroup;
  teatroFormGroup!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private adminTeatroService: AdminTeatroService,
    private adminService: AdminService,
    private _snackBar: MatSnackBar
  ) {
    this.adminTeatroService.editarTeatro.subscribe((seleccion) => {
      if (this.teatro !== seleccion) {
        this.teatro = seleccion;
        this.ciudadSelec = this.teatro.ciudad;
        this.adminTeatroSelec = this.teatro.administradorTeatro;
        this.adminTeatroFormGroup
          .get('admin')
          ?.setValue(this.teatro.administradorTeatro);
        /* this.adminTeatroFormGroup.controls['admin'].setValue(
          this.teatro.administradorTeatro
        ); */
        this.teatroFormGroup.get('ciudad')?.setValue(this.teatro.ciudad);
        /* this.teatroFormGroup.controls['ciudad'].setValue(this.teatro.ciudad); */
        this.teatroFormGroup.controls['direccion'].setValue(
          this.teatro.direccion
        );
        this.teatroFormGroup.controls['telefono'].setValue(
          this.teatro.telefono
        );
      }
    });
  }

  ngOnInit() {
    this.adminTeatroFormGroup = this._formBuilder.group({
      admin: ['', Validators.required],
    });

    this.teatroFormGroup = this._formBuilder.group({
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
    });

    this.adminTeatroService.listarCiudades().subscribe((result) => {
      this.ciudades = result.ciudades;
    });

    this.adminService.listarAdminTeatros().subscribe((result: any) => {
      console.log(result.administradorTeatro);
      this.administradoresTeatro = result.admins_teatro;
    });
  }

  agregar() {
    let teatro_nuevo: Teatro = {
      codigo: 0,
      ciudad: this.teatroFormGroup.controls['ciudad'].value,
      direccion: this.teatroFormGroup.controls['direccion'].value,
      salas: [],
      telefono: this.teatroFormGroup.controls['telefono'].value,
      administradorTeatro: this.adminTeatroFormGroup.controls['admin'].value,
    };

    this.adminTeatroService.agregarTeatro(teatro_nuevo).subscribe({
      next: (result) => {
        this.openSnackBar(result.mensaje);
      },
      error: (err) => {
        this.openSnackBar(err.error.mensaje);
      },
    });

    this.adminTeatroFormGroup.controls['admin'].setValue({});
    this.teatroFormGroup.controls['direccion'].setValue('');
    this.teatroFormGroup.controls['telefono'].setValue('');
    this.teatroFormGroup.controls['ciudad'].setValue({});

    this.adminTeatroService.cambiarSeleccion(0);
  }

  editar() {
    let teatro_edit: Teatro = {
      codigo: this.teatro.codigo,
      ciudad: this.teatroFormGroup.controls['ciudad'].value,
      direccion: this.teatroFormGroup.controls['direccion'].value,
      salas: [],
      telefono: this.teatroFormGroup.controls['telefono'].value,
      administradorTeatro: this.adminTeatroFormGroup.controls['admin'].value,
    };

    this.adminTeatroService.editarTeatroExistente(teatro_edit).subscribe({
      next: (result) => {
        console.log(result.mensaje);
        this.openSnackBar(result.mensaje);
      },
      error: (err) => {
        this.openSnackBar(err.error.mensaje);
      },
    });

    this.adminTeatroFormGroup.controls['admin'].setValue({});
    this.teatroFormGroup.controls['direccion'].setValue('');
    this.teatroFormGroup.controls['telefono'].setValue('');
    this.teatroFormGroup.controls['ciudad'].setValue({});

    this.adminTeatroService.cambiarSeleccion(0);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Aceptar', {
      duration: 5000,
    });
  }
}
