import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {ProductService} from './product.service';
import {FilterModel} from '../models/filter.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarComponent} from '../snack-bar/snack-bar/snack-bar.component';

@Injectable({providedIn: 'root'})
export class FilterService implements OnDestroy {
    public filterState = new Subject();

    public isModalOpen = false;

    public styleList = ['Плаття', 'Штани', 'Спортивний одяг',
        'Куртки', 'Пальта', 'Футболки',
        'Майки', 'кардигани', 'шорти', 'комбенізони',
        'Халати', 'блузки', 'спідниці', 'жилетки', 'спецодяг', 'сумки'];
    public clearFilterSubject = new BehaviorSubject(null);
    public filters: FilterModel = {
        style: '',
        price: {
            max: null,
            min: null
        }
    };
    public appliedFilters = new BehaviorSubject(this.filters);

    constructor(private readonly productService: ProductService, private readonly snackBar: MatSnackBar) {

        this.filterState.subscribe((value: FilterModel) => {
            if (value?.price.min && !value?.price.max && !value.style) {
                alert(1);
                this.productService.listProducts = this.productService.initListProductsSubject.value
                    .filter((item => item.price >= value?.price.min));

                return;
            }
            if (value?.price.min > value?.price.max) {
                alert(2);
                this.snackBar.openFromComponent(SnackBarComponent, {duration: 500, data: {message: 'Неправильно заданий фільтр'}});

                return;
            }
            if (!value?.price.max && !value.price.min && !value.style) {
                this.clearFilter();
                return;
            }
            if (value?.price.max && !value.price.min && !value.style) {
                this.productService.listProducts = this.productService.initListProductsSubject.value
                    .filter((item => item.price <= value?.price.max));

                return;
            }

            if (value?.price.min && value?.price.max && !value.style) {
                this.productService.listProducts = this.productService.initListProductsSubject.value
                    .filter(
                        ((item) => (+item.price) >= value?.price.min && (+item.price) <= value?.price.max));

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
        this.productService.listProducts.sort((a, b) => a.price - b.price);
    }

    sortLow(): void {
        this.productService.listProducts.sort((a, b) => b.price - a.price);
    }

    clearFilter(): void {
        for (const item in this.appliedFilters.value) {
            if (typeof this.appliedFilters.value[item] === 'object') {
                for (const subItem in this.appliedFilters.value[item]) {
                    this.appliedFilters.value[item][subItem] = null;
                }
            } else {
                this.appliedFilters.value[item] = null;
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
