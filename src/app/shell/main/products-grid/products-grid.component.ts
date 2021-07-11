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
  public paginatorValue = [];

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
    this.filterService.clearFilter.subscribe(value => {
      this.currentPageProducts.next(this.listProducts);
      this.currentPageValue.next(0);
    });
    this.$products.subscribe((value: ProductModel[]) => {
      this.listProducts = value;
      for (let i = 0; i < this.listProducts.length / 6; i++) {
        this.paginatorValue.push(i + 1);
      }
      this.currentPageProducts.next(this.listProducts.slice(this.currentPageValue.value * 6, 6 + this.currentPageValue.value));
    });

    this.currentPageValue.subscribe(() => {
      this.currentPageProducts.next(this.listProducts.slice(this.currentPageValue.value * 6, (this.currentPageValue.value + 6)));
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
      let products;
      if (value?.price.min && !value?.price.max && !value.style) {
        products = this.listProducts.filter((item => item.price >= value?.price.min));
      }
      if (value?.price.max && !this.filterValue?.price.min && !value.style) {
        products = this.listProducts.filter((item => item.price <= value?.price.max));
      }

      if (value?.price.min && value?.price.max && !value.style) {
        products = this.listProducts.filter(
          (item => item.price >= value?.price.min && item.price <= value?.price.max));
      }
      if (value?.price.min && value?.price.max && value.style) {
        products = this.listProducts.filter(
          (item => item.style === value.style && item.price >= value?.price.min && item.price <= value.price.max));
      }
      if (value?.style && !value?.price.min && !value?.price.max) {
        products = this.listProducts.filter(item => item.style === value?.style);
      }
      if (value?.style && value?.price.min && !value?.price.max) {
        products = this.listProducts.filter(item => item.style === value?.style && item.price >= value?.price.min);
      }
      if (value?.style && !value?.price.min && value?.price.max) {
        products = this.listProducts.filter(item => item.style === value?.style && item.price <= value?.price.max);
      }
      this.currentPageProducts.next(products);
    });
    // this.currentPageProducts = this.listProducts.slice(this.currentPageValue.value, 6 + this.currentPageValue.value);
  }

  showDetails(id): void {
    this.route.navigate(['details', id]);
  }

  nextPage(value?: number): void {
    this.currentPageValue.next(value);

  }

}
