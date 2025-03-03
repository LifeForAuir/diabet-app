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
  selector: 'app-insulin-dialog',
  templateUrl: './insulin-dialog.component.html',
  styleUrls: ['./insulin-dialog.component.scss'],
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
export class InsulinDialogComponent {
  insulinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InsulinDialogComponent>,
    private diabetesService: DiabetesService
  ) {
    this.insulinForm = this.fb.group({
      units: ['', [Validators.required, Validators.min(0)]],
      datetime: [new Date(), Validators.required]
    });
  }

  onSubmit(): void {
    if (this.insulinForm.valid) {
      this.diabetesService.addInsulinRecord(this.insulinForm.value)
        .subscribe(record => {
          this.dialogRef.close(record);
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 