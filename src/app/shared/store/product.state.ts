import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {GetProductsAction, GetProductsActionById} from './product.action';
import {map} from 'rxjs/operators';
import {FilterService} from '../services/filter.service';
import {HttpService} from '../services/http.service';

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
    constructor(
        private readonly filterService: FilterService,
        private readonly httpService: HttpService
                ) {
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
        this.httpService.getProduct().pipe(map(((value: ProductModel[]) => {
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
        this.httpService.getProduct().subscribe(value => {
            patchState({productItem: value[id]});
        });
    }
}
