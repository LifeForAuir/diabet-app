import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Dish, Ingredient, IngredientWithWeight, DishWithWeight, CustomPart } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {
  
  createNewIngredient(name: string, proteins: number, fats: number, carbs: number): Ingredient {
    return {
      id: crypto.randomUUID(),
      name,
      proteins,
      fats,
      carbohydrates: carbs,
      isSaved: false
    };
  }

  calculateIngredientNutrients(ingredient: IngredientWithWeight): { proteins: number, fats: number, carbs: number } {
    const multiplier = ingredient.weight / 100;
    return {
      proteins: Number((ingredient.proteins * multiplier).toFixed(1)),
      fats: Number((ingredient.fats * multiplier).toFixed(1)),
      carbs: Number((ingredient.carbohydrates * multiplier).toFixed(1))
    };
  }

  calculateDishNutrients(dish: DishWithWeight): { proteins: number, fats: number, carbs: number } {
    const multiplier = dish.weight / 100;
    return {
      proteins: Number((dish.totalProteins * multiplier).toFixed(1)),
      fats: Number((dish.totalFats * multiplier).toFixed(1)),
      carbs: Number((dish.totalCarbohydrates * multiplier).toFixed(1))
    };
  }

  calculateCustomPartNutrients(part: CustomPart): { proteins: number, fats: number, carbs: number } {
    const multiplier = part.weight / 100;
    return {
      proteins: Number((part.proteins * multiplier).toFixed(1)),
      fats: Number((part.fats * multiplier).toFixed(1)),
      carbs: Number((part.carbohydrates * multiplier).toFixed(1))
    };
  }

  calculateTotalNutrients(
    dishes: DishWithWeight[], 
    ingredients: IngredientWithWeight[],
    customParts: CustomPart[]
  ): { 
    weight: number, 
    proteins: number, 
    fats: number, 
    carbs: number 
  } {
    const totals = {
      weight: 0,
      proteins: 0,
      fats: 0,
      carbs: 0
    };

    dishes.forEach(dish => {
      const dishNutrients = this.calculateDishNutrients(dish);
      totals.weight += dish.weight;
      totals.proteins += dishNutrients.proteins;
      totals.fats += dishNutrients.fats;
      totals.carbs += dishNutrients.carbs;
    });

    ingredients.forEach(ingredient => {
      const nutrients = this.calculateIngredientNutrients(ingredient);
      totals.weight += ingredient.weight;
      totals.proteins += nutrients.proteins;
      totals.fats += nutrients.fats;
      totals.carbs += nutrients.carbs;
    });

    customParts.forEach(part => {
      const nutrients = this.calculateCustomPartNutrients(part);
      totals.weight += part.weight;
      totals.proteins += nutrients.proteins;
      totals.fats += nutrients.fats;
      totals.carbs += nutrients.carbs;
    });

    return {
      weight: Number(totals.weight.toFixed(1)),
      proteins: Number(totals.proteins.toFixed(1)),
      fats: Number(totals.fats.toFixed(1)),
      carbs: Number(totals.carbs.toFixed(1))
    };
  }

  calculateBreadUnits(carbs: number): number {
    return Number((carbs / 12).toFixed(1));
  }

  saveNewIngredient(ingredient: Ingredient): Observable<Ingredient> {
    // TODO: Заменить на реальный HTTP запрос
    return of({ ...ingredient, isSaved: true });
  }
} 