import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recuperacion-cuenta-correo',
  templateUrl: './recuperacion-cuenta-correo.component.html',
  styleUrls: ['./recuperacion-cuenta-correo.component.css'],
})
export class RecuperacionCuentaCorreoComponent implements OnInit {
  miFormulario: UntypedFormGroup = this.fb.group({
    correo: [, [Validators.required, Validators.email]],
  });

  guardar() {
    this.authService
      .recuperarCuenta(this.miFormulario.controls['correo'].value)
      .subscribe({
        next: (result) => {
          Swal.fire({
            title: 'Recuperacion de cuenta',
            text: result.mensaje,
            icon: 'info',
          });
        },
        error: (err) => {},
      });
  }

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
}
