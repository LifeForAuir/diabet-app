export interface User {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  insulinPerBreadUnit: number;
}

export interface GlucoseRecord {
  id: string;
  value: number;
  datetime: Date;
}

export interface Ingredient {
  id: string;
  name: string;
  proteins: number;    // на 100г
  fats: number;       // на 100г
  carbohydrates: number; // на 100г
  isSaved?: boolean;
}

export interface IngredientWithWeight extends Ingredient {
  weight: number;
}

export interface Dish {
  id: string;
  name: string;
  ingredients: IngredientWithWeight[];
  totalProteins: number;
  totalFats: number;
  totalCarbohydrates: number;
  isSaved?: boolean;
}

export interface DishWithWeight extends Dish {
  weight: number;
}

export interface MealRecord {
  id: string;
  dishes: DishWithWeight[];
  ingredients: IngredientWithWeight[];
  totalWeight: number;
  totalProteins: number;
  totalFats: number;
  totalCarbohydrates: number;
  breadUnits: number;
  datetime: Date;
}

export interface InsulinRecord {
  id: string;
  units: number;
  datetime: Date;
} 