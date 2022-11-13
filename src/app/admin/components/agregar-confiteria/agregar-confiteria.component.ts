import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfiteriaFile } from '../../interfaces/admin.interface';

@Component({
  selector: 'app-agregar-confiteria',
  templateUrl: './agregar-confiteria.component.html',
  styleUrls: ['./agregar-confiteria.component.css'],
})
export class AgregarConfiteriaComponent implements OnInit {
  img_seleccionada: String = '';
  selectedFile!: File;

  constructor(
    public dialogRef: MatDialogRef<AgregarConfiteriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfiteriaFile
  ) {}

  onFileSelected(event: any) {
    this.img_seleccionada = event.target.files[0].name;
    this.selectedFile = <File>event.target.files[0];
    this.data.imagenFile = this.selectedFile;
    console.log(this.img_seleccionada);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {}
}
