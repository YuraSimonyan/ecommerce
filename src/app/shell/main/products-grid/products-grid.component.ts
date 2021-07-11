import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {ProductState} from '../../../shared/store/product.state';
import {GetProductsAction} from '../../../shared/store/product.action';
import {BehaviorSubject, Observable} from 'rxjs';
import {FilterService} from '../../../shared/services/filter.service';
import {ProductService} from '../../../shared/services/product.service';
import {ProductModel} from '../../../shared/models/product.model';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent implements OnInit, AfterViewInit {
  public listProducts;
  public filterValue;

  public datasource: null;
  public length: number;

  public currentPageValue = new BehaviorSubject(0);
  public currentPageProducts: BehaviorSubject<ProductModel[]> = new BehaviorSubject(null);
  @Select(ProductState.productData)
  $products: Observable<ProductModel[]>;

  constructor(
    private productService: ProductService,
    public filterService: FilterService,
    private route: Router,
    private store: Store
  ) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.$products.subscribe((value: ProductModel[]) => {
      this.listProducts = value;
      this.currentPageProducts.next(this.listProducts.slice(this.currentPageValue.value, 6 + this.currentPageValue.value));
    });
    // this.filterService.clearFilter.subscribe((value => {
    //   if (this.filterService.filterState) {
    //     this.currentPageValue.next(0);
    //   }
    //   this.currentPageValue.next(0);
    // }));


    this.currentPageValue.subscribe(() => {
      this.currentPageProducts.next(this.listProducts.slice(this.currentPageValue.value, 6 + this.currentPageValue.value));
    });

    this.store.dispatch(new GetProductsAction());
    this.filterService.sortState.subscribe(value => {
      if (value === 'high') {
        this.currentPageProducts.next(this.listProducts.sort((a, b) => {
          return a.price - b.price;
        }).slice(0, 6));
      } else {
        this.currentPageProducts.next(this.listProducts.sort((a, b) => {
          return b.price - a.price;
        }).slice(0, 6));
      }

    });

    this.filterService.filterState.subscribe((value: any) => {
      if (value?.price.min && !value?.price.max && !value.style) {
        this.currentPageProducts.next(this.listProducts.filter((item => item.price >= value?.price.min)).slice(0, 6));
      }
      if (value?.price.max && !this.filterValue?.price.min && !value.style) {
        this.currentPageProducts.next(this.listProducts.filter((item => item.price <= value?.price.max)).slice(0, 6));
      }

      if (value?.price.min && value?.price.max && !value.style) {
        this.currentPageProducts.next(this.listProducts.filter(
          (item => item.price >= value?.price.min && item.price <= value?.price.max)).slice(0, 6));
      }
      if (value?.price.min && value?.price.max && value.style) {
        this.currentPageProducts.next(this.listProducts.filter(
          (item => item.style === value.style && item.price >= value?.price.min && item.price <= value.price.max)).slice(0, 6));
      }
      if (value?.style && !value?.price.min && !value?.price.max) {
        this.currentPageProducts.next(this.listProducts.filter(item => item.style === value?.style).slice(0, 6));
      }
      if (value?.style && value?.price.min && !value?.price.max) {
        this.currentPageProducts.next(this.listProducts.filter(item => item.style === value?.style && item.price >= value?.price.min).slice(0, 6));
      }
      if (value?.style && !value?.price.min && value?.price.max) {
        this.currentPageProducts.next(this.listProducts.filter(item => item.style === value?.style && item.price <= value?.price.max).slice(0, 6));
      }

    });
    // this.currentPageProducts = this.listProducts.slice(this.currentPageValue.value, 6 + this.currentPageValue.value);
  }

  showDetails(id): void {
    this.route.navigate(['details', id]);
  }

  // public getServerData(event?: PageEvent): PageEvent {
  //   this.$products.subscribe(
  //     response => {
  //       if (response.error) {
  //       } else {
  //         if (this.listProducts) {
  //           this.datasource = response.data;
  //           this.pageIndex = response.pageIndex;
  //           this.pageSize = response.pageSize;
  //           this.length = response.length;
  //         }
  //
  //       }
  //     }
  //   );
  //   return event;
  // }
  nextPage(): void {
    this.currentPageValue.next(this.currentPageValue.value + 6);

  }

  cleanFilter(): void {

  }

  previousPage(): void {
    this.currentPageValue.next(this.currentPageValue.value - 6);
  }
}
