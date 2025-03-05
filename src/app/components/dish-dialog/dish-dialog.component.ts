import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NutritionService } from '../../services/nutrition.service';
import { Dish, IngredientWithWeight, Ingredient } from '../../interfaces/user.interface';

@Component({
  selector: 'app-dish-dialog',
  templateUrl: './dish-dialog.component.html',
  styleUrls: ['./dish-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule
  ]
})
export class DishDialogComponent {
  dishForm: FormGroup;
  selectedIngredients: IngredientWithWeight[] = [];
  savedIngredients: Ingredient[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DishDialogComponent>,
    private nutritionService: NutritionService,
    @Inject(MAT_DIALOG_DATA) public data: { savedIngredients: Ingredient[] }
  ) {
    this.savedIngredients = data.savedIngredients;
    this.dishForm = this.fb.group({
      name: ['', Validators.required],
      proteins: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      fats: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      carbs: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      ingredients: [[]]
    });
  }

  onIngredientSelected(event: any): void {
    const ingredient = event.value;
    this.selectedIngredients.push({ ...ingredient, weight: 100 });
  }

  updateIngredientWeight(ingredient: IngredientWithWeight, event: Event): void {
    const weight = Number((event.target as HTMLInputElement).value);
    ingredient.weight = weight;
  }

  removeIngredient(ingredient: IngredientWithWeight): void {
    this.selectedIngredients = this.selectedIngredients.filter(i => i !== ingredient);
  }

  onSubmit(): void {
    if (this.dishForm.valid) {
      const { name, proteins, fats, carbs } = this.dishForm.value;
      
      const newDish: Dish = {
        id: crypto.randomUUID(),
        name,
        ingredients: this.selectedIngredients,
        totalProteins: proteins,
        totalFats: fats,
        totalCarbohydrates: carbs,
        isSaved: false
      };
      
      this.dialogRef.close(newDish);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 