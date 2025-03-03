import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NutritionService } from '../../services/nutrition.service';
import { Ingredient } from '../../interfaces/user.interface';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class IngredientDialogComponent {
  ingredientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<IngredientDialogComponent>,
    private nutritionService: NutritionService
  ) {
    this.ingredientForm = this.fb.group({
      name: ['', Validators.required],
      proteins: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      fats: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      carbs: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  onSubmit(): void {
    if (this.ingredientForm.valid) {
      const { name, proteins, fats, carbs } = this.ingredientForm.value;
      const newIngredient = this.nutritionService.createNewIngredient(
        name,
        proteins,
        fats,
        carbs
      );
      
      this.nutritionService.saveNewIngredient(newIngredient)
        .subscribe(savedIngredient => {
          this.dialogRef.close(savedIngredient);
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 