import { Component, Input, TemplateRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule
  ]
})
export class CardComponent<T> {
  @Input() title: string = '';
  @Input() contentClass: string = '';
  @Input() items: T[] = [];
  @ContentChild('itemTemplate') itemTemplate!: TemplateRef<{ $implicit: T }>;
}
