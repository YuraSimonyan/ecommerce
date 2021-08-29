import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Select} from '@ngxs/store';
import {ProductState} from '../../../shared/store/product.state';
import {Observable} from 'rxjs';
import {FilterService} from '../../../shared/services/filter.service';
import {ProductModel} from '../../../shared/models/product.model';


@Component({
    selector: 'app-products-grid',
    templateUrl: './products-grid.component.html',
    styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent implements OnInit {

    public datasource: null;
    public length: number;
    @Select(ProductState.productData)
    $products: Observable<ProductModel[]>;

    constructor(
        public filterService: FilterService,
        private route: Router,
    ) {
    }

    ngOnInit(): void {
        this.filterService.dispatchDataFromStore();
    }

    showDetails(id): void {
        this.route.navigate(['details', id]);
    }

}
