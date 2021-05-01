import {Injectable} from '@angular/core';
import {GetProductService} from './get-product.service';

@Injectable({providedIn: 'root'})
export class ProductService {
  products = [

  ];

  constructor(private getProductService: GetProductService) {
  }



}
