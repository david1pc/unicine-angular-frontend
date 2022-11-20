import { Component, OnInit } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Imagen } from 'src/app/admin/interfaces/admin.interface';
import Swal from 'sweetalert2';
import { Cliente, ClienteFile, Rol } from '../../interfaces/cliente.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  miFormulario: UntypedFormGroup = this.fb.group({
    primer_nombre: [, [Validators.required, Validators.minLength(3)]],
    segundo_nombre: [,],
    primer_apellido: [, [Validators.required, Validators.minLength(3)]],
    segundo_apellido: [,],
    username: [, [Validators.required, Validators.minLength(5)]],
    cedula: [, [Validators.required, Validators.minLength(5)]],
    password: [, [Validators.required, Validators.minLength(5)]],
    correo: [, [Validators.required, Validators.email]],
    telefonos: this.fb.array([], Validators.required),
    imagen: [,],
  });

  imagen_nueva!: File;

  nuevoCliente!: ClienteFile;

  nuevoTelefono: UntypedFormControl = this.fb.control('', Validators.required);

  get telefonosArr() {
    return this.miFormulario.get('telefonos') as UntypedFormArray;
  }

  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  constructor(private authService: AuthService, private fb: UntypedFormBuilder) {}

  agregarTelefono() {
    if (!Number(this.nuevoTelefono.value)) {
      return;
    }

    if (this.nuevoTelefono.invalid) {
      return;
    }

    this.telefonosArr.push(
      new UntypedFormControl(this.nuevoTelefono.value, Validators.required)
    );

    this.nuevoTelefono.setValue('');
  }

  borrar(index: number) {
    this.telefonosArr.removeAt(index);
  }

  ngOnInit(): void {}

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    let rol: Rol = {
      codigo: 1,
      nombre: 'ROLE_CLIENTE',
    };

    let imagen_d: Imagen = {
      codigo: 0,
      imagenId: '',
      imagenUrl: '',
      nombre: '',
    };

    const cliente: ClienteFile = {
      correo: this.miFormulario.controls['correo'].value,
      password: this.miFormulario.controls['password'].value,
      primerNombre: this.miFormulario.controls['primer_nombre'].value,
      segundoNombre: this.miFormulario.controls['segundo_nombre'].value,
      primerApellido: this.miFormulario.controls['primer_apellido'].value,
      segundoApellido: this.miFormulario.controls['segundo_apellido'].value,
      cedula: this.miFormulario.controls['cedula'].value,
      rol: rol,
      username: this.miFormulario.controls['username'].value,
      estado: false,
      telefonos: this.telefonosArr.controls.map((telefono) => telefono.value),
      imagenFile: this.imagen_nueva,
      imagen: imagen_d,
    };

    this.nuevoCliente = cliente;

    this.authService.crearCliente(this.nuevoCliente).subscribe({
      next: (resp) => {
        Swal.fire({
          title: 'Registro de cliente',
          text: resp.mensaje,
          icon: 'success',
        });
      },
      error: (err) => {
        Swal.fire({
          title: err.error.mensaje,
          icon: 'error',
          text: err.error.error,
        });
      },
    });

    let rol_a!: Rol;
    let imagen2!: File;

    this.nuevoCliente = {
      correo: '',
      password: '',
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      username: '',
      cedula: '',
      rol: rol_a,
      estado: false,
      telefonos: [],
      imagenFile: imagen2,
      imagen: imagen_d,
    };

    this.telefonosArr.clear();

    this.miFormulario.reset();
  }

  uploadFile(event: any) {
    const file: File = event.target.files[0];
    this.imagen_nueva = file;
  }
}
