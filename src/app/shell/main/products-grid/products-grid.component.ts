import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Select} from '@ngxs/store';
import {ProductState} from '../../../shared/store/product.state';
import {Observable, Subscription} from 'rxjs';
import {FilterService} from '../../../shared/services/filter.service';
import {ProductModel} from '../../../shared/models/product.model';
import {ProductService} from '../../../shared/services/product.service';
import {HttpService} from '../../../shared/services/http.service';


@Component({
    selector: 'app-products-grid',
    templateUrl: './products-grid.component.html',
    styleUrls: ['./products-grid.component.scss'],
})
export class ProductsGridComponent implements OnInit, OnDestroy {

    public datasource: null;
    public length: number;
    @Select(ProductState.productData)
    $products: Observable<ProductModel[]>;
    private subscription: Subscription;

    constructor(
        public readonly filterService: FilterService,
        private readonly route: Router,
        public readonly productService: ProductService,
        private readonly httpService: HttpService
    ) {
    }

    ngOnInit(): void {
        this.productService.dispatchProductsFromStore();
        this.productService.productsAmount.subscribe(() => {
            this.productService.dispatchProductsFromStore();
        });
        this.filterService.clearFilterSubject.subscribe(() => {
            this.productService.listProducts = this.productService.initListProductsSubject.value;
        });
        this.subscription = this.$products.subscribe((productList) => {
            this.productService.initListProductsSubject.next(productList);
            this.productService.listProducts = this.productService.initListProductsSubject.value;
        });
    }

    showDetails(id): void {
        this.route.navigate(['details', id]);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    loadMoreProducts(): void {
        this.productService.productsAmount.next(this.productService.productsAmount.value + 6);
    }
}
