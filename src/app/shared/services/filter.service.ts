import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {GetProductsAction} from '../store/product.action';
import {ProductModel} from '../models/product.model';
import {Store} from '@ngxs/store';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class FilterService implements OnDestroy {
    public filterState = new Subject();
    public sortState = new Subject();
    public listProducts: ProductModel[];
    public isModalOpen = false;

    public styleList = ['Плаття', 'Штани', 'Спортивний одяг',
        'Куртки', 'Пальта', 'Футболки',
        'Майки', 'кардигани', 'шорти', 'комбенізони',
        'Халати', 'блузки', 'спідниці', 'жилетки', 'спецодяг', 'сумки'];
    public filterValue;
    clearFilterSubject = new BehaviorSubject(null);
    filters = {
        style: '',
        price: {
            max: 0,
            min: 0
        }
    };
    appliedFilters = new BehaviorSubject(this.filters);

    constructor(
        private readonly store: Store,
        private readonly http: HttpClient
    ) {
        this.filterState.subscribe((value: any) => {
            let products;
            if (value?.price.min && !value?.price.max && !value.style) {
                products = this.listProducts.filter((item => item.price >= value?.price.min));
            }
            if (value?.price.max && !this.filterValue?.price.min && !value.style) {
                products = this.listProducts.filter((item => item.price <= value?.price.max));
            }

            if (value?.price.min && value?.price.max && !value.style) {
                products = this.listProducts.filter(
                    (item => item.price >= value?.price.min && item.price <= value?.price.max));
            }
            if (value?.price.min && value?.price.max && value.style) {
                products = this.listProducts.filter(
                    (item => item.style === value.style && item.price >= value?.price.min && item.price <= value.price.max));
            }
            if (value?.style && !value?.price.min && !value?.price.max) {
                products = this.listProducts.filter(item => item.style === value?.style);
            }
            if (value?.style && value?.price.min && !value?.price.max) {
                products = this.listProducts.filter(item => item.style === value?.style && item.price >= value?.price.min);
            }
            if (value?.style && !value?.price.min && value?.price.max) {
                products = this.listProducts.filter(item => item.style === value?.style && item.price <= value?.price.max);
            }
            // this.currentPageProducts.next(products);
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

    public dispatchDataFromStore(): void {
        this.store.dispatch(new GetProductsAction());
    }


    addValueDataBase(value: ProductModel): Observable<ProductModel> {
        return this.http.post<ProductModel>('https://database-25cda-default-rtdb.firebaseio.com/products.json', value);
    }

    editProduct(value, id): void {
        this.http.patch(`https://database-25cda-default-rtdb.firebaseio.com/products/${id}.json`, value).subscribe();

    }

    getProduct(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>('https://database-25cda-default-rtdb.firebaseio.com/products.json');
    }

    ngOnDestroy(): void {
    }
}
