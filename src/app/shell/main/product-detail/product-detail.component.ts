import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {GetProductsActionById} from '../../../shared/store/product.action';
import {ProductState} from '../../../shared/store/product.state';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id: string;
  @Select(ProductState.productItem)
  productData: Observable<any>;
  @ViewChild('mainImage', {static: false}) mainImage;
  showPage = false;


  constructor(private router: ActivatedRoute,
              private store: Store) {
  }


  ngOnInit(): void {
    this.productData.subscribe(value => {
      if (Object.keys(value).length !== 0) {
        this.showPage = true;
      }
    });
    this.id = this.router.snapshot.params['id'];
    this.store.dispatch(new GetProductsActionById(this.id));
  }

  onChangeImg(event): void {
    // this.mainImg.next(event.target.getAttribute('src'));
  }
}
