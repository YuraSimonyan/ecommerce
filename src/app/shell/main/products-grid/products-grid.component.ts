import {Component, OnInit} from '@angular/core';
import {ProductModel} from '../../../shared/models/product.model';
import {GetProductService} from '../../../shared/services/get-product.service';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent implements OnInit {
  products = [];

  constructor(private getProductService: GetProductService) {
  }

  ngOnInit(): void {
    this.getProductService.getProduct().subscribe(value => {
      for (const key in value) {
        value[key].id = key;
        this.products.push(value[key]);
        console.log(this.products);
      }
    });
  }

  showDetails() {

  }
}
