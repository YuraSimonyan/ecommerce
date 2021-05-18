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
  appliedFilters = {
    style: '',
    price: {
      max: '',
      min: ''
    }
  };
  isExpanded = false;


  constructor(private filterService: FilterService) {
  }

  ngOnInit(): void {

  }

  onAddStyle(style, toggleStyle): void {
    this.appliedFilters.style = style;
    toggleStyle.close();
  }

  clearFilter(): void {
    for (const item in this.appliedFilters) {
      if (typeof this.appliedFilters[item] === 'object') {
        for (const subItem in this.appliedFilters[item]) {
          this.appliedFilters[item][subItem] = '';
        }
      }
      this.appliedFilters[item] = '';
    }
  }

  serchFilter(): void {
    this.filterService.filterState.next(this.appliedFilters);
  }
}
