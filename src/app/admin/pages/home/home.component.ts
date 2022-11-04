import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  id!: Number | undefined;
  rol!: String | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    let id_local: Number = Number(localStorage.getItem('token'));
    if (id_local && this.id == null) {
      this.id = id_local;
      this.rol = String(localStorage.getItem('rol'));
    }
  }

  logout() {
    this.id = undefined;
    this.rol = undefined;
    this.authService.logout();
    this.router.navigate(['./']);
  }
}
