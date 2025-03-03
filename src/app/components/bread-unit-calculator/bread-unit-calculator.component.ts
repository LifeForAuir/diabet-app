import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DiabetesService } from '../../services/diabetes.service';

@Component({
  selector: 'app-bread-unit-calculator',
  templateUrl: './bread-unit-calculator.component.html',
  styleUrls: ['./bread-unit-calculator.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class BreadUnitCalculatorComponent {
  calculatorForm: FormGroup;
  breadUnits: number = 0;
  insulinDose: number = 0;

  constructor(
    private fb: FormBuilder,
    private diabetesService: DiabetesService
  ) {
    this.calculatorForm = this.fb.group({
      proteins: [0, [Validators.required, Validators.min(0)]],
      fats: [0, [Validators.required, Validators.min(0)]],
      carbohydrates: [0, [Validators.required, Validators.min(0)]]
    });

    this.calculatorForm.valueChanges.subscribe(() => {
      this.calculate();
    });
  }

  calculate(): void {
    if (this.calculatorForm.valid) {
      const { carbohydrates } = this.calculatorForm.value;
      this.breadUnits = this.diabetesService.calculateBreadUnits(carbohydrates);
      this.insulinDose = this.diabetesService.calculateInsulinDose(this.breadUnits);
    }
  }

  reset(): void {
    this.calculatorForm.reset({
      proteins: 0,
      fats: 0,
      carbohydrates: 0
    });
    this.breadUnits = 0;
    this.insulinDose = 0;
  }
} 