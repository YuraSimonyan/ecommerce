import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductService} from './product.service';
import {ProductModel} from '../models/product.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AddProductService {
  constructor(private http: HttpClient, private productService: ProductService) {
  }

  addValueDataBase(value: ProductModel): Observable<any> {

    return this.http.post('https://pash1-70445-default-rtdb.firebaseio.com/products.json', value);

  }
}
