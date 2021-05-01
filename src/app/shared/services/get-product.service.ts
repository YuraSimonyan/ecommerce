import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetProductModel} from '../models/get-product.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class GetProductService {
  constructor(private http: HttpClient) {
  }

  getProduct(): Observable<any> {

    return this.http.get('https://forward-rarity-302511-default-rtdb.firebaseio.com/products.json');

  }

}
