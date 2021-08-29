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


    public searchFilter(): void {
        this.filterService.searchFilter();
    }

    public clearFilter(): void {
        this.filterService.clearFilter();
    }
}
