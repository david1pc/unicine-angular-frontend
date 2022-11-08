import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Login, rol } from '../../interfaces/cliente.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    username: [, [Validators.required, Validators.minLength(5)]],
    password: [, [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  guardar() {
    localStorage.clear();

    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    const login: Login = {
      username: this.miFormulario.controls['username'].value,
      password: this.miFormulario.controls['password'].value,
    };

    this.authService.iniciar_sesion(login).subscribe({
      next: (resp) => {
        this.router.navigate(['/cartelera']);
        Swal.fire({
          title: resp.mensaje,
          icon: 'success',
        });
      },
      error: (err) => {
        if (err.status == 406) {
          Swal.fire({
            title: err.error.mensaje,
            icon: 'info',
            text: err.error.error,
          });
        } else if (err.status == 404) {
          Swal.fire({
            title: err.error.mensaje,
            icon: 'error',
            text: err.error.error,
          });
        }
      },
    });
  }
}
