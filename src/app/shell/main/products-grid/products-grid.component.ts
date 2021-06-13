import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {ProductState} from '../../../shared/store/product.state';
import {GetProductsAction} from '../../../shared/store/product.action';
import {Observable} from 'rxjs';
import {FilterService} from '../../../shared/services/filter.service';
import {ProductService} from '../../../shared/services/product.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent implements OnInit {
  public listProducts;
  public filterValue;
  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number;
  pageSize: number;
  length: number;

  @Select(ProductState.productData)
  $products: Observable<any>;

  constructor(
    private productService: ProductService,
    private filterService: FilterService,
    private route: Router,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.getServerData(null);


    this.filterService.fetchProducts.subscribe(() => {
        this.$products.subscribe(value => this.listProducts = value);
      }
    );
    this.$products.subscribe((value) => {
      this.listProducts = value;
      console.log(this.listProducts);
    });
    this.filterService.sortState.subscribe(value => {
      this.$products.subscribe((products) => {
          if (value === 'high') {
            this.listProducts = products.sort((a, b) => {
              return +(a.price.slice(1)) - (+b.price.slice(1));
            });
          } else {
            this.listProducts = products.sort((a, b) => {
              return +(+b.price.slice(1)) - (+a.price.slice(1));
            });
          }

        }
      );
    });

    this.filterService.filterState.subscribe((value) => {
      this.filterValue = value;
      this.$products.subscribe((products) => {
        if (this.filterValue.price.min && !this.filterValue.price.max && !this.filterValue.style) {
          this.listProducts = products.filter((item => +(item.price.slice(1)) >= this.filterValue.price.min));
        }
        if (this.filterValue.price.max && !this.filterValue.price.min && !this.filterValue.style) {
          this.listProducts = products.filter((item => +(item.price.slice(1)) <= this.filterValue.price.max));
        }

        if (this.filterValue.price.min && this.filterValue.price.max && !this.filterValue.style) {
          this.listProducts = products.filter(
            (item => +(item.price.slice(1)) >= this.filterValue.price.min && +(item.price.slice(1)) <= this.filterValue.price.max));
        }
        if (this.filterValue.price.min && this.filterValue.price.max && this.filterValue.style) {
          this.listProducts = products.filter(
            (item => item.style === this.filterValue.style && +(item.price.slice(1)) >= this.filterValue.price.min && +(item.price.slice(1)) <= this.filterValue.price.max));
        }
        if (this.filterValue.style && !this.filterValue.price.min && !this.filterValue.price.max) {
          this.listProducts = products.filter(item => item.style === this.filterValue.style);
        }
        if (this.filterValue.style && this.filterValue.price.min && !this.filterValue.price.max) {
          this.listProducts = products.filter(item => item.style === this.filterValue.style && +(item.price.slice(1)) >= this.filterValue.price.min);
        }
        if (this.filterValue.style && !this.filterValue.price.min && this.filterValue.price.max) {
          this.listProducts = products.filter(item => item.style === this.filterValue.style && +(item.price.slice(1)) <= this.filterValue.price.max);
        }
      });

    });
    this.store.dispatch(new GetProductsAction());
  }

  showDetails(id): void {
    this.route.navigate(['details', id]);
  }

  public getServerData(event?: PageEvent): PageEvent {
    this.$products.subscribe(
      response => {
        if (response.error) {
        } else {
          this.datasource = response.data;
          this.pageIndex = response.pageIndex;
          this.pageSize = response.pageSize;
          this.length = response.length;
        }
      }
    );
    return event;
  }
}
