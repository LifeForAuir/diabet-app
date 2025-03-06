import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chip-item',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule
  ],
  template: `
    <mat-chip (removed)="onRemove()">
      <div class="chip">
        <span>{{label}}</span>
        <mat-form-field class="weight-input">
          <input matInput type="number" [ngModel]="weight" (ngModelChange)="onWeightChange($event)" min="1">
          <span matSuffix>г</span>
        </mat-form-field>
        <div class="nutrient-info" *ngIf="nutrients">
          (Б:{{nutrients.proteins}} Ж:{{nutrients.fats}} У:{{nutrients.carbs}})
        </div>
      </div>
      <button matChipRemove>
        <mat-icon>cancel</mat-icon>
      </button>
    </mat-chip>
  `,
  styleUrls: ['./chip-item.component.scss']
})
export class ChipItemComponent {
  @Input() label!: string;
  @Input() weight!: number;
  @Input() nutrients?: { proteins: number, fats: number, carbs: number };
  
  @Output() weightChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<void>();

  onWeightChange(newWeight: number) {
    if (newWeight > 0) {
      this.weightChange.emit(newWeight);
    }
  }

  onRemove() {
    this.remove.emit();
  }
} 