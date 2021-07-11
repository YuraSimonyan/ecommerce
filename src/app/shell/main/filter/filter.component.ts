import {Component, OnInit} from '@angular/core';
import {FilterService} from '../../../shared/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  styleList = ['Плаття', 'Штани', 'Спортивний одяг',
    'Куртки', 'Пальта', 'Футболки',
    'Майки', 'Кардигани', 'Шорти', 'Комбенізони',
    'Халати', 'Блузки', 'Спідниці', 'Жилетки', 'Спецодяг', 'Сумки'];
  isExpanded = false;


  constructor(public filterService: FilterService) {
  }

  ngOnInit(): void {

  }

  onAddStyle(style, toggleStyle): void {
    this.filterService.appliedFilters.value.style = style;
    toggleStyle.close();
  }

  clearFilter(): void {
    for (const item in this.filterService.appliedFilters.value) {
      if (typeof this.filterService.appliedFilters.value[item] === 'object') {
        for (const subItem in this.filterService.appliedFilters.value[item]) {
          this.filterService.appliedFilters.value[item][subItem] = '';
        }
      } else {
        this.filterService.appliedFilters.value[item] = '';
      }
    }
    this.filterService.clearFilter.next(true);
  }

  serchFilter(): void {
    this.filterService.filterState.next(this.filterService.appliedFilters.value);
  }
}
