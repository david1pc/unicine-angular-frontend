import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Imagen } from 'src/app/admin/interfaces/admin.interface';
import Swal from 'sweetalert2';
import { Cliente, Rol } from '../../interfaces/cliente.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
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

  nuevoCliente!: Cliente;

  nuevoTelefono: FormControl = this.fb.control('', Validators.required);

  get telefonosArr() {
    return this.miFormulario.get('telefonos') as FormArray;
  }

  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  agregarTelefono() {
    if (!Number(this.nuevoTelefono.value)) {
      return;
    }

    if (this.nuevoTelefono.invalid) {
      return;
    }

    this.telefonosArr.push(
      new FormControl(this.nuevoTelefono.value, Validators.required)
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

    const cliente: Cliente = {
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
      imagen: this.imagen_nueva,
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
      imagen: imagen2,
    };

    this.telefonosArr.clear();

    this.miFormulario.reset();
  }

  uploadFile(event: any) {
    const file: File = event.target.files[0];
    this.imagen_nueva = file;
  }
}
