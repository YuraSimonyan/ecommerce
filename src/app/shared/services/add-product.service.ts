import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductService} from './product.service';

@Injectable({providedIn: 'root'})
export class AddProductService {
  constructor(private http: HttpClient, private productService: ProductService) {
  }

  addValue() {
    const value = this.productService.products;
    console.log(value, 121321);
    this.http.post('https://forward-rarity-302511-default-rtdb.firebaseio.com/products.json', JSON.stringify(value)).subscribe(value1 => console.log(value1));
  }
}
