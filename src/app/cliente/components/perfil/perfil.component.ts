import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Imagen } from 'src/app/admin/interfaces/admin.interface';
import { ClienteFile, Rol } from 'src/app/auth/interfaces/cliente.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { ClienteServiceService } from '../../services/cliente.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
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

  codigoCliente!: number;

  imagen_nueva!: File;

  estadoCliente!: boolean;

  imagenCliente!: Imagen;

  nuevoCliente!: ClienteFile;

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

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteServiceService,
    private router: Router
  ) {}

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

  ngOnInit(): void {
    let username: string = localStorage.getItem('username')!;
    this.clienteService.obtener_cliente(username).subscribe((result) => {
      let cliente = result.cliente;
      this.miFormulario.controls['primer_nombre'].setValue(
        cliente.primerNombre
      );
      this.miFormulario.controls['primer_apellido'].setValue(
        cliente.primerApellido
      );
      this.miFormulario.controls['segundo_apellido'].setValue(
        cliente.segundoApellido
      );
      this.miFormulario.controls['segundo_nombre'].setValue(
        cliente.segundoNombre
      );

      this.codigoCliente = cliente.codigo;
      this.estadoCliente = cliente.estado;
      this.imagenCliente = cliente.imagen;

      this.miFormulario.controls['cedula'].setValue(cliente.cedula);
      for (let telef of cliente.telefonos) {
        this.telefonosArr.push(new FormControl(telef, Validators.required));
      }
      this.miFormulario.controls['password'].setValue(cliente.password);
      this.miFormulario.controls['username'].setValue(cliente.username);
      this.miFormulario.controls['correo'].setValue(cliente.correo);
      this.miFormulario.controls['imagen'].setValue(cliente.imagen);
    });
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    let rol: Rol = {
      codigo: 1,
      nombre: 'ROLE_CLIENTE',
    };

    const cliente: ClienteFile = {
      codigo: this.codigoCliente,
      correo: this.miFormulario.controls['correo'].value,
      password: this.miFormulario.controls['password'].value,
      primerNombre: this.miFormulario.controls['primer_nombre'].value,
      segundoNombre: this.miFormulario.controls['segundo_nombre'].value,
      primerApellido: this.miFormulario.controls['primer_apellido'].value,
      segundoApellido: this.miFormulario.controls['segundo_apellido'].value,
      cedula: this.miFormulario.controls['cedula'].value,
      rol: rol,
      username: this.miFormulario.controls['username'].value,
      estado: this.estadoCliente,
      telefonos: this.telefonosArr.controls.map((telefono) => telefono.value),
      imagenFile: this.imagen_nueva,
      imagen: this.imagenCliente,
    };

    this.clienteService.actualizarCliente(cliente).subscribe({
      next: (resp) => {
        const refrescar = () => {
          this.telefonosArr.clear();

          this.miFormulario.reset();

          this.ngOnInit();

          this.router.navigate(['./perfil']);
        };
        Swal.fire({
          title: 'Actualizar datos del cliente',
          text: resp.mensaje,
          icon: 'success',
          didClose() {
            refrescar();
          },
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
  }

  uploadFile(event: any) {
    const file: File = event.target.files[0];
    this.imagen_nueva = file;
  }
}
