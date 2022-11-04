import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login, rol } from '../../interfaces/cliente.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    correo: [, [Validators.required, Validators.minLength(5)]],
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
      correo: this.miFormulario.controls['correo'].value,
      password: this.miFormulario.controls['password'].value,
    };

    this.authService.login(login).subscribe((resp) => {
      if (resp.auth.rol === rol.CLIENTE) {
        this.router.navigate(['./']);
      } else {
        this.router.navigate(['./admin/listado-peliculas']);
      }
    });
  }
}
