import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComboFile } from '../../interfaces/admin.interface';

@Component({
  selector: 'app-agregar-combo',
  templateUrl: './agregar-combo.component.html',
  styleUrls: ['./agregar-combo.component.css']
})
export class AgregarComboComponent implements OnInit {

  img_seleccionada: String = '';
  selectedFile!: File;

  constructor(
    public dialogRef: MatDialogRef<AgregarComboComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ComboFile
  ) {}

  onFileSelected(event: any) {
    this.img_seleccionada = event.target.files[0].name;
    this.selectedFile = <File>event.target.files[0];
    this.data.imagenFile = this.selectedFile;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {}
}
