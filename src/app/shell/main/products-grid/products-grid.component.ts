import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {ProductModel} from '../../../shared/models/product.model';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent implements OnInit {
products: ProductModel[];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.products;
  }

}
