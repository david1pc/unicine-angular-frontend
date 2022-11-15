import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  DistribucionSillas,
  Sala,
  Teatro,
} from '../../interfaces/admin.interface';
import { AdminTeatroService } from '../../services/admin-teatro.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-agregar-sala',
  templateUrl: './agregar-sala.component.html',
  styleUrls: ['./agregar-sala.component.css'],
})
export class AgregarSalaComponent implements OnInit {
  distribucionesSillas!: DistribucionSillas[];
  teatros!: Teatro[];
  constructor(
    private adminTeatroService: AdminTeatroService,
    private adminService: AdminService,
    public dialogRef: MatDialogRef<AgregarSalaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sala
  ) {}

  ngOnInit() {
    this.adminTeatroService.listarDistribucionSillas().subscribe((result) => {
      this.distribucionesSillas = result.distribucion;
    });

    this.adminService.listarAdminTeatros().subscribe((result: any) => {
      this.teatros = result.admins_teatro;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
