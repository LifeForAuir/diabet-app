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
  selector: 'app-meal-dialog',
  templateUrl: './meal-dialog.component.html',
  styleUrls: ['./meal-dialog.component.scss'],
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
export class MealDialogComponent {
  mealForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MealDialogComponent>,
    private diabetesService: DiabetesService
  ) {
    this.mealForm = this.fb.group({
      description: ['', Validators.required],
      proteins: [0, [Validators.required, Validators.min(0)]],
      fats: [0, [Validators.required, Validators.min(0)]],
      carbohydrates: [0, [Validators.required, Validators.min(0)]],
      datetime: [new Date(), Validators.required]
    });

    this.mealForm.get('carbohydrates')?.valueChanges.subscribe(value => {
      const breadUnits = this.diabetesService.calculateBreadUnits(value);
      this.mealForm.patchValue({ breadUnits }, { emitEvent: false });
    });
  }

  onSubmit(): void {
    if (this.mealForm.valid) {
      const formValue = this.mealForm.value;
      formValue.breadUnits = this.diabetesService.calculateBreadUnits(formValue.carbohydrates);
      
      this.diabetesService.addMealRecord(formValue)
        .subscribe(record => {
          this.dialogRef.close(record);
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 