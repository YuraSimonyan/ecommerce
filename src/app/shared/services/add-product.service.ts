import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductService} from './product.service';
import {ProductModel} from '../models/product.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AddProductService {
  constructor(private http: HttpClient) {
  }

  addValueDataBase(value: ProductModel): Observable<any> {
    return this.http.post('https://pasha2-fe82f-default-rtdb.firebaseio.com/products.json', value);

  }
}
