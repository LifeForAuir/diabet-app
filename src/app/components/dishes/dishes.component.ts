import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { DishDialogComponent } from '../dish-dialog/dish-dialog.component';
import { DiabetesService } from '../../services/diabetes.service';
import { Dish, Ingredient } from '../../interfaces/user.interface';
import { IngredientDialogComponent } from '../ingredient-dialog/ingredient-dialog.component';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatListModule,
    CardComponent
  ]
})
export class DishesComponent {
  dishes: Dish[] = [];
  ingredients: Ingredient[] = [];

  constructor(
    private diabetesService: DiabetesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.diabetesService.getSavedDishes().subscribe(dishes => {
      this.dishes = dishes;
    });

    this.diabetesService.getSavedIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }

  openDishDialog(): void {
    const dialogRef = this.dialog.open(DishDialogComponent, {
      data: { savedIngredients: this.ingredients }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }

  openIngredientDialog(): void {
    const dialogRef = this.dialog.open(IngredientDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }
}
