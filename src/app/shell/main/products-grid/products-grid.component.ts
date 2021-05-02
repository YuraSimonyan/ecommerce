import {Component, OnInit} from '@angular/core';
import {ProductModel} from '../../../shared/models/product.model';
import {GetProductService} from '../../../shared/services/get-product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent implements OnInit {
  products = [];

  constructor(private getProductService: GetProductService, private route: Router, private router: ActivatedRoute) {
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

  showDetails(id): void {
    this.route.navigate(['details', id]);
  }
}
