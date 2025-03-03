import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { HistoryComponent } from './components/history/history.component';
import { BreadUnitCalculatorComponent } from './components/bread-unit-calculator/bread-unit-calculator.component';

export const routes: Routes = [
  { path: '', redirectTo: '/history', pathMatch: 'full' },
  { path: 'settings', component: UserSettingsComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'calculator', component: BreadUnitCalculatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 