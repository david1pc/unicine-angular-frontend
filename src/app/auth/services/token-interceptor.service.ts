import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');

    let jwttoken = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token || '',
      },
    });

    return next.handle(jwttoken).pipe(
      tap({
        next: () => {},
        error: (err) => {
          console.log(err);
          if (err.error.estadoExpiracion) {
            Swal.fire({
              text: err.error.mensaje,
              title: 'La sesion ha expirado',
              icon: 'info',
              didClose() {
                localStorage.clear();
                window.location.href = 'http://localhost:4200/';
              },
            });
          } else if (err.status == 401) {
            this.router.navigate(['/error-401']);
          }
        },
      })
    );
  }
}
