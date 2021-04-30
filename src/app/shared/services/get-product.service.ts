import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetProductModel} from '../models/get-product.model';

@Injectable({providedIn: 'root'})
export class GetProductService {
  fetchedProducts: GetProductModel[];

  constructor(private http: HttpClient) {
  }

  getProduct() {

    this.http.get('https://forward-rarity-302511-default-rtdb.firebaseio.com/products.json')
      .subscribe(value => console.log(value));
  }

}
