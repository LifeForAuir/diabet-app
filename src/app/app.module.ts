import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Material импорты
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { GlucoseDialogComponent } from './components/glucose-dialog/glucose-dialog.component';
import { MealDialogComponent } from './components/meal-dialog/meal-dialog.component';
import { InsulinDialogComponent } from './components/insulin-dialog/insulin-dialog.component';
import { HistoryComponent } from './components/history/history.component';
import { BreadUnitCalculatorComponent } from './components/bread-unit-calculator/bread-unit-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    UserSettingsComponent,
    GlucoseDialogComponent,
    MealDialogComponent,
    InsulinDialogComponent,
    HistoryComponent,
    BreadUnitCalculatorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    // Material модули
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 