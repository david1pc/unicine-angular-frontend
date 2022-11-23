import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recuperacion-cuenta-password',
  templateUrl: './recuperacion-cuenta-password.component.html',
  styleUrls: ['./recuperacion-cuenta-password.component.css'],
})
export class RecuperacionCuentaPasswordComponent implements OnInit {
  miFormulario: UntypedFormGroup = this.fb.group({
    passwd: [, [Validators.required]],
  });
  str!: string;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  guardar() {
    let passwd = this.miFormulario.controls['passwd'].value;
    this.authService.verificarCuenta(this.str, passwd).subscribe({
      next: (result) => {
        const redirigir = () => {
          this.router.navigate(['/']);
        };
        Swal.fire({
          title: 'Recuperacion de cuenta',
          text: result.mensaje,
          icon: 'success',
          didClose() {
            redirigir();
          },
        });
      },
      error: (error) => {
        const redirigir = () => {
          this.router.navigate(['/']);
        };
        Swal.fire({
          title: 'Recuperacion de cuenta',
          text: error.error.mensaje,
          icon: 'error',
          didClose() {
            redirigir();
          },
        });
      },
    });
  }

  ngOnInit(): void {
    this.str = this.activateRoute.snapshot.paramMap.get('token')!;
  }
}
