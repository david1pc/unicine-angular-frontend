import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  id!: Number | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    let id_local: Number = Number(localStorage.getItem('token'));
    if (id_local && this.id == null) {
      this.id = id_local;
    }
  }

  logout() {
    this.id = undefined;
    this.authService.logout();
  }
}
