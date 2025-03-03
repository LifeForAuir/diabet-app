export interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  insulinPerBreadUnit: number;
}

export interface GlucoseRecord {
  id: number;
  value: number;
  datetime: Date;
}

export interface MealRecord {
  id: number;
  description: string;
  proteins: number;
  fats: number;
  carbohydrates: number;
  breadUnits: number;
  datetime: Date;
}

export interface InsulinRecord {
  id: number;
  units: number;
  datetime: Date;
} 