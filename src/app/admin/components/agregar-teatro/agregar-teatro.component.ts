import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  AdministradorTeatro,
  Ciudad,
  Teatro,
} from '../../interfaces/admin.interface';
import { AdminTeatroService } from '../../services/admin-teatro.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-agregar-teatro',
  templateUrl: './agregar-teatro.component.html',
  styleUrls: ['./agregar-teatro.component.css'],
})
export class AgregarTeatroComponent implements OnInit {
  ciudades!: Ciudad[];
  administradoresTeatro!: AdministradorTeatro[];

  constructor(
    private adminTeatroService: AdminTeatroService,
    private adminService: AdminService,
    public dialogRef: MatDialogRef<AgregarTeatroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Teatro
  ) {}

  ngOnInit() {
    this.adminTeatroService.listarCiudades().subscribe((result) => {
      this.ciudades = result.ciudades;
    });

    this.adminService.listarAdminTeatros().subscribe((result: any) => {
      this.administradoresTeatro = result.admins_teatro;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
