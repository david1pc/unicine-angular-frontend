import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-activacion-cuenta',
  templateUrl: './activacion-cuenta.component.html',
  styleUrls: ['./activacion-cuenta.component.css'],
})
export class ActivacionCuentaComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  activarCuenta() {
    let str!: string | null;
    str = this.activateRoute.snapshot.paramMap.get('msj');
    console.log(str);
    this.authService.activarCuenta(str).subscribe({
      next: (resp: any) => {
        Swal.fire({
          title: resp.mensaje,
          icon: 'success',
        });
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        Swal.fire({
          title: err.error.mensaje,
          icon: 'error',
          text: err.error.error,
        });
        this.router.navigate(['/']);
      },
    });
  }

  ngOnInit(): void {}
}
