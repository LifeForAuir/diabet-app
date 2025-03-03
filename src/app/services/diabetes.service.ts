import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, GlucoseRecord, MealRecord, InsulinRecord } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class DiabetesService {
  private mockUser: User = {
    id: 1,
    firstName: 'Иван',
    lastName: 'Петров',
    birthDate: new Date('1990-01-01'),
    insulinPerBreadUnit: 1.5
  };

  private mockGlucoseRecords: GlucoseRecord[] = [
    { id: 1, value: 5.5, datetime: new Date() },
    { id: 2, value: 6.2, datetime: new Date(Date.now() - 86400000) }
  ];

  private mockMealRecords: MealRecord[] = [
    {
      id: 1,
      description: 'Овсянка с фруктами',
      proteins: 10,
      fats: 5,
      carbohydrates: 45,
      breadUnits: 3.75,
      datetime: new Date()
    }
  ];

  private mockInsulinRecords: InsulinRecord[] = [
    { id: 1, units: 5, datetime: new Date() }
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
    const newRecord = { ...record, id: this.mockGlucoseRecords.length + 1 };
    this.mockGlucoseRecords.push(newRecord);
    return of(newRecord);
  }

  getMealRecords(): Observable<MealRecord[]> {
    return of(this.mockMealRecords);
  }

  addMealRecord(record: MealRecord): Observable<MealRecord> {
    const newRecord = { ...record, id: this.mockMealRecords.length + 1 };
    this.mockMealRecords.push(newRecord);
    return of(newRecord);
  }

  getInsulinRecords(): Observable<InsulinRecord[]> {
    return of(this.mockInsulinRecords);
  }

  addInsulinRecord(record: InsulinRecord): Observable<InsulinRecord> {
    const newRecord = { ...record, id: this.mockInsulinRecords.length + 1 };
    this.mockInsulinRecords.push(newRecord);
    return of(newRecord);
  }

  calculateBreadUnits(carbohydrates: number): number {
    return carbohydrates / 12; // 1 ХЕ = 12 грамм углеводов
  }

  calculateInsulinDose(breadUnits: number): number {
    return breadUnits * this.mockUser.insulinPerBreadUnit;
  }
}