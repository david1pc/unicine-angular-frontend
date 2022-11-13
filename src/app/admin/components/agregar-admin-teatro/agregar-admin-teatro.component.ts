import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdministradorTeatro } from '../../interfaces/admin.interface';

@Component({
  selector: 'app-agregar-admin-teatro',
  templateUrl: './agregar-admin-teatro.component.html',
  styleUrls: ['./agregar-admin-teatro.component.css'],
})
export class AgregarAdminTeatroComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AgregarAdminTeatroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdministradorTeatro
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
