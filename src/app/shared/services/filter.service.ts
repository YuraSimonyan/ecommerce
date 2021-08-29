import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {ProductService} from './product.service';

@Injectable({providedIn: 'root'})
export class FilterService implements OnDestroy {
    public filterState = new Subject();
    public sortState = new Subject();

    public isModalOpen = false;

    public styleList = ['Плаття', 'Штани', 'Спортивний одяг',
        'Куртки', 'Пальта', 'Футболки',
        'Майки', 'кардигани', 'шорти', 'комбенізони',
        'Халати', 'блузки', 'спідниці', 'жилетки', 'спецодяг', 'сумки'];
    public filterValue;
    public clearFilterSubject = new BehaviorSubject(null);
    public filters = {
        style: '',
        price: {
            max: 0,
            min: 0
        }
    };
    public appliedFilters = new BehaviorSubject(this.filters);

    constructor(private readonly productService: ProductService
    ) {
        this.filterState.subscribe((value: any) => {
            if (value?.price.min && !value?.price.max && !value.style) {
                this.productService.listProducts = this.productService.initListProductsSubject.value
                    .filter((item => item.price >= value?.price.min));
                return;
            }
            if (value?.price.max && !this.filterValue?.price.min && !value.style) {
                this.productService.listProducts = this.productService.initListProductsSubject.value
                    .filter((item => item.price <= value?.price.max));
                return;
            }

            if (value?.price.min && value?.price.max && !value.style) {
                this.productService.listProducts = this.productService.initListProductsSubject.value
                    .filter(
                        (item => item.price >= value?.price.min && item.price <= value?.price.max));
                return;
            }
            if (value?.price.min && value?.price.max && value.style) {
                this.productService.listProducts = this.productService.initListProductsSubject.value
                    .filter(
                        (item => item.style === value.style && item.price >= value?.price.min && item.price <= value.price.max));
                return;
            }
            if (value?.style && !value?.price.min && !value?.price.max) {
                this.productService.listProducts = this.productService.initListProductsSubject.value
                    .filter(item => item.style === value?.style);
                return;
            }
            if (value?.style && value?.price.min && !value?.price.max) {
                this.productService.listProducts = this.productService.initListProductsSubject.value
                    .filter(item => item.style === value?.style && item.price >= value?.price.min);
                return;
            }
            if (value?.style && !value?.price.min && value?.price.max) {
                this.productService.listProducts = this.productService.initListProductsSubject.value
                    .filter(item => item.style === value?.style && item.price <= value?.price.max);
                return;
            }
        });

    }

    sortHigh(): void {
        this.sortState.next('high');
    }

    sortLow(): void {
        this.sortState.next('low');
    }

    clearFilter(): void {
        for (const item in this.appliedFilters.value) {
            if (typeof this.appliedFilters.value[item] === 'object') {
                for (const subItem in this.appliedFilters.value[item]) {
                    this.appliedFilters.value[item][subItem] = '';
                }
            } else {
                this.appliedFilters.value[item] = '';
            }
        }
        this.clearFilterSubject.next(true);
    }

    searchFilter(): void {
        this.filterState.next(this.appliedFilters.value);
    }


    ngOnDestroy(): void {
    }
}
