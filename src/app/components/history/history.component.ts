import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DiabetesService } from '../../services/diabetes.service';
import { GlucoseRecord, MealRecord, InsulinRecord } from '../../interfaces/user.interface';
import { GlucoseDialogComponent } from '../glucose-dialog/glucose-dialog.component';
import { MealDialogComponent } from '../meal-dialog/meal-dialog.component';
import { InsulinDialogComponent } from '../insulin-dialog/insulin-dialog.component';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    GlucoseDialogComponent,
    MealDialogComponent,
    InsulinDialogComponent,
    CardComponent
  ]
})
export class HistoryComponent implements OnInit {
  glucoseRecords: GlucoseRecord[] = [];
  mealRecords: MealRecord[] = [];
  insulinRecords: InsulinRecord[] = [];

  constructor(
    private diabetesService: DiabetesService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.diabetesService.getGlucoseRecords().subscribe(records => {
      this.glucoseRecords = records.sort((a, b) => 
        new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
      );
    });

    this.diabetesService.getMealRecords().subscribe(records => {
      this.mealRecords = records.sort((a, b) => 
        new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
      );
    });

    this.diabetesService.getInsulinRecords().subscribe(records => {
      this.insulinRecords = records.sort((a, b) => 
        new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
      );
    });
  }

  openGlucoseDialog(): void {
    const dialogRef = this.dialog.open(GlucoseDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }

  openMealDialog(): void {
    const dialogRef = this.dialog.open(MealDialogComponent, {
      disableClose: true,
      autoFocus: false
    });
    
    this.cdr.detectChanges();
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }

  openInsulinDialog(): void {
    const dialogRef = this.dialog.open(InsulinDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }
} 