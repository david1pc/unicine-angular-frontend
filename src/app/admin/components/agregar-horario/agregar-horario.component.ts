import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Horario } from '../../interfaces/admin.interface';

@Component({
  selector: 'app-agregar-horario',
  templateUrl: './agregar-horario.component.html',
  styleUrls: ['./agregar-horario.component.css'],
})
export class AgregarHorarioComponent implements OnInit {
  diasDisponibles: string[] = ['L', 'M', 'MI', 'J', 'S', 'D'];
  diaEsCorrecto: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AgregarHorarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Horario
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
