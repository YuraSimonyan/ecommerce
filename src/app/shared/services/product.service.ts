import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ProductModel} from '../models/product.model';
import {GetProductsAction} from '../store/product.action';
import {Store} from '@ngxs/store';

@Injectable({providedIn: 'root'})
export class ProductService {
    public initListProductsSubject = new BehaviorSubject(null);
    public listProducts: ProductModel[];
    public productsAmount = new BehaviorSubject(12);

    constructor(private readonly store: Store) {
    }

    public dispatchProductsFromStore(): void {
        this.store.dispatch(new GetProductsAction());
    }
}
