import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {GetProductsActionById} from '../../../../../../shared/store/product.action';
import {ProductState} from '../../../../../../shared/store/product.state';
import {Observable} from 'rxjs';
import {ProductModel} from '../../../../../../shared/models/product.model';
import {ProductService} from '../../../../../../shared/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  productId;
  listStyles = this.productService.styleList;
  product: ProductModel;
  @Select(ProductState.productItem)
  $productData: Observable<any>;

  constructor(private route: ActivatedRoute, private store: Store, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.store.dispatch(new GetProductsActionById(this.productId));
    this.$productData.subscribe((value: ProductModel) => this.product = value);

  }

}
