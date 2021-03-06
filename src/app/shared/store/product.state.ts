import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {GetProductsAction, GetProductsActionById} from './product.action';
import {map, take} from 'rxjs/operators';
import {FilterService} from '../services/filter.service';
import {HttpService} from '../services/http.service';
import {ProductService} from '../services/product.service';

export interface ProductStateModel {
    productData: ProductModel[];
    productItem: ProductModel;
}

@State<ProductStateModel>({
    name: 'product',
    defaults: {
        productData: [],
        productItem: {
            title: null,
            description: null,
            style: null,
            price: null,
            isPromoted: null,
            promotedPrice: null,
            date: null,
            materialName: null,
            img: [],
            id: null
        }
    }
})
@Injectable()
export class ProductState {
    constructor(
        private readonly filterService: FilterService,
        private readonly httpService: HttpService,
        private readonly productService: ProductService
    ) {
    }

    @Selector()
    static productData(state: ProductStateModel): ProductModel[] {
        return state.productData;
    }

    @Selector()
    static productItem(state: ProductStateModel): ProductModel {
        return state.productItem;
    }

    @Action(GetProductsAction)
    GetProductsAction({patchState}: StateContext<ProductStateModel>): void {
        this.httpService.getProduct(this.productService.productsAmount.value)
            .pipe(take(1), map(((value: ProductModel[]) => {

                const productArr = [];
                for (const key in value) {
                    value[key]['id'] = key;
                    productArr.push(value[key]);
                }
                return productArr;
            }))).subscribe((products: ProductModel[]) => {
            patchState({productData: products});
        });
    }

    @Action(GetProductsActionById)
    GetProductsActionById(
        {patchState}: StateContext<ProductStateModel>,
        {id}: GetProductsActionById): void {
        this.httpService.getProductById(id).pipe(take(1)).subscribe((product: ProductModel) => {
            patchState({productItem: product});
        });
    }
}
