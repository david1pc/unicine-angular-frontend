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

  ngOnInit(): void {
    let str = this.activateRoute.snapshot.paramMap.get('msj')!;
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
}
