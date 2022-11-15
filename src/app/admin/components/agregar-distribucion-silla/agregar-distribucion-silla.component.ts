import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DistribucionSillas } from '../../interfaces/admin.interface';
import { AdminTeatroService } from '../../services/admin-teatro.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-agregar-distribucion-silla',
  templateUrl: './agregar-distribucion-silla.component.html',
  styleUrls: ['./agregar-distribucion-silla.component.css'],
})
export class AgregarDistribucionSillaComponent implements OnInit {
  constructor(
    private adminTeatroService: AdminTeatroService,
    private adminService: AdminService,
    public dialogRef: MatDialogRef<AgregarDistribucionSillaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DistribucionSillas
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
