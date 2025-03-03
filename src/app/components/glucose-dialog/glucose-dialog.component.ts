import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DiabetesService } from '../../services/diabetes.service';

@Component({
  selector: 'app-glucose-dialog',
  templateUrl: './glucose-dialog.component.html',
  styleUrls: ['./glucose-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule
  ]
})
export class GlucoseDialogComponent {
  glucoseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GlucoseDialogComponent>,
    private diabetesService: DiabetesService
  ) {
    this.glucoseForm = this.fb.group({
      value: ['', [Validators.required, Validators.min(0)]],
      datetime: [new Date(), Validators.required]
    });
  }

  onSubmit(): void {
    if (this.glucoseForm.valid) {
      this.diabetesService.addGlucoseRecord(this.glucoseForm.value)
        .subscribe(record => {
          this.dialogRef.close(record);
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 