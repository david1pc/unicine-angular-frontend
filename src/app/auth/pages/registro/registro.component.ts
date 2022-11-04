import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Cliente } from '../../interfaces/cliente.interface';
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
    cedula: [, [Validators.required, Validators.minLength(5)]],
    password: [, [Validators.required, Validators.minLength(5)]],
    correo: [, [Validators.required, Validators.minLength(5)]],
    telefonos: this.fb.array([], Validators.required),
  });

  nuevoCliente!: Cliente;

  nuevoTelefono: FormControl = this.fb.control('', Validators.required);

  get telefonosArr() {
    return this.miFormulario.get('telefonos') as FormArray;
  }

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  agregarTelefono() {
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

    const cliente: Cliente = {
      correo: this.miFormulario.controls['correo'].value,
      password: this.miFormulario.controls['password'].value,
      primerNombre: this.miFormulario.controls['primer_nombre'].value,
      segundoNombre: this.miFormulario.controls['segundo_nombre'].value,
      primerApellido: this.miFormulario.controls['primer_apellido'].value,
      segundoApellido: this.miFormulario.controls['segundo_apellido'].value,
      cedula: this.miFormulario.controls['cedula'].value,
      estado: false,
      telefonos: this.telefonosArr.controls.map((telefono) => telefono.value),
    };

    this.nuevoCliente = cliente;

    this.authService.crearCliente(this.nuevoCliente).subscribe((resp) => {
      console.log(resp);
    });

    this.nuevoCliente = {
      correo: '',
      password: '',
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      cedula: '',
      estado: false,
      telefonos: [],
    };

    this.telefonosArr.clear();

    this.miFormulario.reset();
  }
}
