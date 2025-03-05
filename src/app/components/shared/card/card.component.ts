import { Component, Input, TemplateRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule
  ]
})
export class CardComponent<T> {
  @Input() title: string = '';
  @Input() contentClass: string = '';
  @Input() items: T[] = [];
  @Input() readonly itemsPerPage = 3;
  @ContentChild('itemTemplate') itemTemplate!: TemplateRef<{ $implicit: T }>;

  visibleItems: T[] = [];
  private currentPage = 1;

  ngOnChanges(): void {
    this.updateVisibleItems();
  }

  loadMore(): void {
    this.currentPage++;
    this.updateVisibleItems();
  }

  private updateVisibleItems(): void {
    this.visibleItems = this.items.slice(0, this.itemsPerPage * this.currentPage);
  }

  get hasMoreItems(): boolean {
    return this.visibleItems.length < this.items.length;
  }
}
