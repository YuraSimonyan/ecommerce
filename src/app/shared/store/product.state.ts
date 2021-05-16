import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {GetProductsAction, GetProductsActionById} from './product.action';
import {GetProductService} from '../services/get-product.service';
import {map} from 'rxjs/operators';

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
  constructor(private getProductService: GetProductService) {
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
    this.getProductService.getProduct().pipe(map(((value: ProductModel[]) => {
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
                        {id}: GetProductsActionById): void{
    this.getProductService.getProduct().subscribe(value => {
      patchState({productItem: value[id]});
    });
  }
}
