import {Component, OnInit} from '@angular/core';
import {GetProductService} from '../../../shared/services/get-product.service';
import {Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {ProductState} from '../../../shared/store/product.state';
import {GetProductsAction} from '../../../shared/store/product.action';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent implements OnInit {

  constructor(
    private getProductService: GetProductService,
    private route: Router,
    private store: Store
  ) {
  }

  @Select(ProductState.productData)
  $products: Observable<any>;

  ngOnInit(): void {
    this.store.dispatch(new GetProductsAction());
  }

  showDetails(id): void {
    this.route.navigate(['details', id]);
  }
}
