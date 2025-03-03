import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { DiabetesService } from '../../services/diabetes.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ]
})
export class UserSettingsComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private diabetesService: DiabetesService
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      insulinPerBreadUnit: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.diabetesService.getUser().subscribe(user => {
      this.userForm.patchValue(user);
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.diabetesService.updateUser(this.userForm.value).subscribe();
    }
  }
} 