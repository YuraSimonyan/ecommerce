import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {ProductService} from './product.service';
import {FilterModel} from '../models/filter.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarComponent} from '../snack-bar/snack-bar/snack-bar.component';
import {styleList} from '../../../assets/style-list/style-list';

@Injectable()
export class FilterService implements OnDestroy {
    public searchFilterText: string;
    public isModalOpen = false;
    public styleList = styleList;
    public clearFilterSubject = new BehaviorSubject(null);
    public filters: FilterModel = {
        style: '',
        price: {
            max: null,
            min: null
        }
    };
    public appliedFilters = new BehaviorSubject(this.filters);
    private filterStateSubject = new Subject();
    public filterState$ = this.filterStateSubject.asObservable();

    constructor(private readonly productService: ProductService, private readonly snackBar: MatSnackBar) {

        this.filterState$.subscribe((filters: FilterModel) => {
            if (!filters?.price.min && !!filters?.price.max && filters.style) {
                this.productService.listProducts = this.productService.initListProductsSubject.value
                    .filter((item => item.style === filters?.style));

                return;
            }
            if (filters?.price.min && !filters?.price.max && !filters.style) {
                this.productService.listProducts = this.productService.initListProductsSubject.value
                    .filter((item => item.price >= filters?.price.min));

                return;
            }
            if (filters?.price.min > filters?.price.max) {
                this.snackBar.openFromComponent(SnackBarComponent, {duration: 500, data: {message: 'Неправильно заданий фільтр'}});

                return;
            }
            if (!filters?.price.max && !filters.price.min && !filters.style) {
                this.clearFilter();
                return;
            }
            if (filters?.price.max && !filters.price.min && !filters.style) {
                this.productService.listProducts = this.productService.initListProductsSubject.value
                    .filter((item => item.price <= filters?.price.max));

                return;
            }

            if (filters?.price.min && filters?.price.max && !filters.style) {
                this.productService.listProducts = this.productService.initListProductsSubject.value
                    .filter(
                        ((item) => (+item.price) >= filters?.price.min && (+item.price) <= filters?.price.max));

                return;
            }
            if (filters?.price.min && filters?.price.max && filters.style) {
                this.productService.listProducts = this.productService.initListProductsSubject.value
                    .filter(
                        (item => item.style === filters.style && item.price >= filters?.price.min && item.price <= filters.price.max));

                return;
            }
            if (filters?.style && !filters?.price.min && !filters?.price.max) {
                this.productService.listProducts = this.productService.initListProductsSubject.value
                    .filter(item => item.style === filters?.style);

                return;
            }
            if (filters?.style && filters?.price.min && !filters?.price.max) {
                this.productService.listProducts = this.productService.initListProductsSubject.value
                    .filter(item => item.style === filters?.style && item.price >= filters?.price.min);

                return;
            }
            if (filters?.style && !filters?.price.min && filters?.price.max) {
                this.productService.listProducts = this.productService.initListProductsSubject.value
                    .filter(item => item.style === filters?.style && item.price <= filters?.price.max);

                return;
            }
        });

    }

    public sortHigh(): void {
        this.productService.listProducts.sort((a, b) => a.price - b.price);
    }

    public sortLow(): void {
        this.productService.listProducts.sort((a, b) => b.price - a.price);
    }

    public clearFilter(): void {
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
        this.filterStateSubject.next(this.appliedFilters.value);
    }


    ngOnDestroy(): void {
    }
}
