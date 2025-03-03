import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, GlucoseRecord, MealRecord, InsulinRecord, Dish, Ingredient } from '../interfaces/user.interface';
import { MOCK_DISHES, MOCK_INGREDIENTS, MOCK_MEAL_RECORDS } from '../mocks/data.mock';

@Injectable({
  providedIn: 'root'
})
export class DiabetesService {
  private mockUser: User = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    firstName: 'Иван',
    lastName: 'Петров',
    birthDate: new Date('1990-01-01'),
    insulinPerBreadUnit: 1.5
  };

  private mockGlucoseRecords: GlucoseRecord[] = [
    { id: '550e8400-e29b-41d4-a716-446655440001', value: 5.5, datetime: new Date() },
    { id: '550e8400-e29b-41d4-a716-446655440002', value: 6.2, datetime: new Date(Date.now() - 86400000) }
  ];

  private dishes: Dish[] = MOCK_DISHES;
  private ingredients: Ingredient[] = MOCK_INGREDIENTS;
  private mealRecords: MealRecord[] = MOCK_MEAL_RECORDS;

  private mockInsulinRecords: InsulinRecord[] = [
    { id: '550e8400-e29b-41d4-a716-446655440003', units: 5, datetime: new Date() }
  ];

  getUser(): Observable<User> {
    return of(this.mockUser);
  }

  updateUser(user: User): Observable<User> {
    this.mockUser = { ...user };
    return of(this.mockUser);
  }

  getGlucoseRecords(): Observable<GlucoseRecord[]> {
    return of(this.mockGlucoseRecords);
  }

  addGlucoseRecord(record: GlucoseRecord): Observable<GlucoseRecord> {
    const newRecord = { 
      ...record, 
      id: crypto.randomUUID()
    };
    this.mockGlucoseRecords.push(newRecord);
    return of(newRecord);
  }

  getSavedDishes(): Observable<Dish[]> {
    return of(this.dishes.filter(dish => dish.isSaved));
  }

  getSavedIngredients(): Observable<Ingredient[]> {
    return of(this.ingredients.filter(ingredient => ingredient.isSaved));
  }

  getMealRecords(): Observable<MealRecord[]> {
    return of(this.mealRecords);
  }

  addMealRecord(record: MealRecord): Observable<MealRecord> {
    const newRecord = {
      ...record,
      id: crypto.randomUUID()
    };
    this.mealRecords.push(newRecord);
    return of(newRecord);
  }

  getInsulinRecords(): Observable<InsulinRecord[]> {
    return of(this.mockInsulinRecords);
  }

  addInsulinRecord(record: InsulinRecord): Observable<InsulinRecord> {
    const newRecord = { 
      ...record, 
      id: crypto.randomUUID()
    };
    this.mockInsulinRecords.push(newRecord);
    return of(newRecord);
  }

  calculateBreadUnits(carbs: number): number {
    return Math.round((carbs / 12) * 10) / 10;
  }

  calculateInsulinDose(breadUnits: number): number {
    return breadUnits * this.mockUser.insulinPerBreadUnit;
  }
}