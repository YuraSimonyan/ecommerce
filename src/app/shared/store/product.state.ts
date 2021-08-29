import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {GetProductsAction, GetProductsActionById} from './product.action';
import {map} from 'rxjs/operators';
import {FilterService} from '../services/filter.service';

export interface ProductStateModel {
    productData: ProductModel[];
    productItem: any;
}

@State<ProductStateModel>({
    name: 'product',
    defaults: {
        productData: [],
        productItem: {}
    }
})
@Injectable()
export class ProductState {
    constructor(private filterService: FilterService) {
    }

    @Selector()
    static productData(state: ProductStateModel): ProductModel[] {
        return state.productData;
    }

    @Selector()
    static productItem(state: ProductStateModel): ProductModel[] {
        return state.productItem;
    }

    @Action(GetProductsAction)
    GetProductsAction({patchState}: StateContext<ProductStateModel>): void {
        this.filterService.getProduct().pipe(map(((value: ProductModel[]) => {
            const productArr = [];
            for (const key in value) {
                value[key]['id'] = key;
                productArr.push(value[key]);
            }
            return productArr;
        }))).subscribe(value => {
            patchState({productData: value});
        });
    }

    @Action(GetProductsActionById)
    GetProductsActionById(
        {patchState}: StateContext<ProductStateModel>,
        {id}: GetProductsActionById): void {
        this.filterService.getProduct().subscribe(value => {
            patchState({productItem: value[id]});
        });
    }
}
