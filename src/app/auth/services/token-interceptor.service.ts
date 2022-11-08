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
          if (err.status == 401) {
            this.router.navigate(['/error-401']);
          } else if (err.status == 403) {
            window.location.href = 'http://localhost:4200/';
          }
        },
      })
    );
  }
}
