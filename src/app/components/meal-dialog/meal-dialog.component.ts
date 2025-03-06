import { Component, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { DiabetesService } from '../../services/diabetes.service';
import { NutritionService } from '../../services/nutrition.service';
import { Dish, Ingredient, IngredientWithWeight, MealRecord, DishWithWeight, CustomPart } from '../../interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IngredientDialogComponent } from '../ingredient-dialog/ingredient-dialog.component';
import { DishDialogComponent } from '../dish-dialog/dish-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChipItemComponent } from '../chip-item/chip-item.component';

interface MealTotals {
  weight: number;
  proteins: number;
  fats: number;
  carbs: number;
  breadUnits: number;
}

@Component({
  selector: 'app-meal-dialog',
  templateUrl: './meal-dialog.component.html',
  styleUrls: ['./meal-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatTabsModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    DragDropModule,
    FormsModule,
    MatProgressSpinnerModule,
    ChipItemComponent
  ],
})
export class MealDialogComponent implements AfterViewInit {
  mealForm: FormGroup;
  savedDishes: Dish[] = [];
  savedIngredients: Ingredient[] = [];
  selectedDishes: DishWithWeight[] = [];
  selectedIngredients: IngredientWithWeight[] = [];
  selectedCustomParts: CustomPart[] = [];
  
  private totalsSubject = new BehaviorSubject<MealTotals>({
    weight: 0,
    proteins: 0,
    fats: 0,
    carbs: 0,
    breadUnits: 0
  });
  totals$ = this.totalsSubject.asObservable();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MealDialogComponent>,
    private diabetesService: DiabetesService,
    protected nutritionService: NutritionService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.mealForm = this.fb.group({
      dishWeight: [100, [Validators.required, Validators.min(1)]],
      ingredientWeight: [100, [Validators.required, Validators.min(1)]],
      customPartWeight: [100, [Validators.required, Validators.min(1)]],
      customPartProteins: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      customPartFats: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      customPartCarbs: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      datetime: [new Date(), Validators.required]
    });

    this.loadSavedItems();
    this.updateTotals();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  private updateTotals(): void {
    const nutrients = this.nutritionService.calculateTotalNutrients(
      this.selectedDishes, 
      this.selectedIngredients,
      this.selectedCustomParts
    );
    
    this.totalsSubject.next({
      weight: nutrients.weight,
      proteins: nutrients.proteins,
      fats: nutrients.fats,
      carbs: nutrients.carbs,
      breadUnits: this.nutritionService.calculateBreadUnits(nutrients.carbs)
    });

    this.cdr.markForCheck();
  }

  loadSavedItems(): void {
    this.diabetesService.getSavedDishes().subscribe(dishes => {
      this.savedDishes = dishes;
    });
    this.diabetesService.getSavedIngredients().subscribe(ingredients => {
      this.savedIngredients = ingredients;
    });
  }

  onDishSelected(event: any): void {
    const selectedDish: Dish = event.value;
    const weight = this.mealForm.get('dishWeight')?.value || 100;
    
    if (!this.selectedDishes.some(dish => dish.id === selectedDish.id)) {
      const dishWithWeight: DishWithWeight = {
        ...selectedDish,
        weight: weight
      };
      this.selectedDishes.push(dishWithWeight);
      this.updateTotals();
    }
  }

  onIngredientSelected(event: any): void {
    const selectedIngredient: Ingredient = event.value;
    const weight = this.mealForm.get('ingredientWeight')?.value || 100;
    
    if (!this.selectedIngredients.some(ingredient => ingredient.id === selectedIngredient.id)) {
      const ingredientWithWeight: IngredientWithWeight = {
        ...selectedIngredient,
        weight: weight
      };
      this.selectedIngredients.push(ingredientWithWeight);
      this.updateTotals();
    }
  }

  updateIngredientWeight(ingredient: IngredientWithWeight, event: any): void {
    const newWeight = Number(event.target.value);
    if (newWeight > 0) {
      const index = this.selectedIngredients.findIndex(i => i.id === ingredient.id);
      if (index !== -1) {
        this.selectedIngredients[index] = {
          ...ingredient,
          weight: newWeight
        };
        this.updateTotals();
      }
    }
  }

  onSubmit(): void {
    if (this.mealForm.valid) {
      const currentTotals = this.totalsSubject.value;
      
      const mealRecord: MealRecord = {
        id: crypto.randomUUID(),
        dishes: this.selectedDishes,
        ingredients: this.selectedIngredients,
        customParts: this.selectedCustomParts,
        totalWeight: currentTotals.weight,
        totalProteins: currentTotals.proteins,
        totalFats: currentTotals.fats,
        totalCarbohydrates: currentTotals.carbs,
        breadUnits: currentTotals.breadUnits,
        datetime: this.mealForm.get('datetime')?.value
      };

      this.diabetesService.addMealRecord(mealRecord)
        .subscribe(record => {
          this.dialogRef.close(record);
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  removeDish(dish: Dish): void {
    const index = this.selectedDishes.findIndex(d => d.id === dish.id);
    if (index >= 0) {
      this.selectedDishes.splice(index, 1);
      this.updateTotals();
    }
  }

  removeIngredient(ingredient: Ingredient): void {
    const index = this.selectedIngredients.findIndex(i => i.id === ingredient.id);
    if (index >= 0) {
      this.selectedIngredients.splice(index, 1);
      this.updateTotals();
    }
  }

  updateDishWeight(dish: DishWithWeight, event: any): void {
    const newWeight = Number(event.target.value);
    if (newWeight > 0) {
      const index = this.selectedDishes.findIndex(d => d.id === dish.id);
      if (index !== -1) {
        this.selectedDishes[index] = {
          ...dish,
          weight: newWeight
        };
        this.updateTotals();
      }
    }
  }

  openNewIngredientDialog(): void {
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.savedIngredients.push(result);
        
        const weight = this.mealForm.get('ingredientWeight')?.value || 100;
        const ingredientWithWeight: IngredientWithWeight = {
          ...result,
          weight
        };
        this.selectedIngredients.push(ingredientWithWeight);
        this.updateTotals();
      }
    });
  }

  openNewDishDialog(): void {
    const dialogRef = this.dialog.open(DishDialogComponent, {
      width: '600px',
      data: { savedIngredients: this.savedIngredients }
    });

    dialogRef.afterClosed().subscribe((newDish: Dish) => {
      if (newDish) {
        this.savedDishes.push(newDish);
      }
    });
  }

  addCustomPart(): void {
    const weight = this.mealForm.get('customPartWeight')?.value;
    const proteins = this.mealForm.get('customPartProteins')?.value;
    const fats = this.mealForm.get('customPartFats')?.value;
    const carbs = this.mealForm.get('customPartCarbs')?.value;

    if (weight && proteins !== null && fats !== null && carbs !== null) {
      const newPart: CustomPart = {
        id: crypto.randomUUID(),
        weight,
        proteins,
        fats,
        carbohydrates: carbs
      };
      this.selectedCustomParts.push(newPart);
      this.updateTotals();
      this.mealForm.patchValue({
        customPartWeight: 100,
        customPartProteins: 0,
        customPartFats: 0,
        customPartCarbs: 0
      });
    }
  }

  removeCustomPart(part: CustomPart): void {
    this.selectedCustomParts = this.selectedCustomParts.filter(p => p.id !== part.id);
    this.updateTotals();
  }

  updateCustomPartWeight(part: CustomPart, event: any): void {
    const newWeight = Number(event.target.value);
    if (newWeight > 0) {
      const index = this.selectedCustomParts.findIndex(p => p.id === part.id);
      if (index !== -1) {
        this.selectedCustomParts[index] = {
          ...part,
          weight: newWeight
        };
        this.updateTotals();
      }
    }
  }
} 