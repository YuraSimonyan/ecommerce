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
  mainPageNum = 0;
  showPage = false;
  imgLength;


  constructor(private router: ActivatedRoute,
              private store: Store) {
  }


  ngOnInit(): void {
    this.productData.subscribe(value => {
      this.imgLength = value?.img?.length;
      if (Object.keys(value).length !== 0) {
        this.showPage = true;
      }
    });
    this.id = this.router.snapshot.params['id'];
    this.store.dispatch(new GetProductsActionById(this.id));
  }

  onChangeImg(event, index): void {
    this.mainPageNum = index;
  }

  nextMainImg(): void {
    this.mainPageNum++;
    if (this.mainPageNum > this.imgLength - 1) {
      this.mainPageNum = 0;
    }
  }

  backMainImg(): void {
    this.mainPageNum--;
    if (this.mainPageNum < 0) {
      this.mainPageNum = this.imgLength - 1;
    }
  }
}
