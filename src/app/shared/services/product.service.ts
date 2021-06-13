import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class ProductService {
  styleList = ['Плаття', 'Штани', 'Спортивний одяг',
    'Куртки', 'Пальта', 'Футболки',
    'Майки', 'кардигани', 'шорти', 'комбенізони',
    'Халати', 'блузки', 'спідниці', 'жилетки', 'спецодяг', 'сумки'];

  constructor(private http: HttpClient) {
  }

  addValueDataBase(value: ProductModel): Observable<any> {
    return this.http.post('https://pasha2-fe82f-default-rtdb.firebaseio.com/products.json', value);

  }

  editProduct(value, id): void {
    this.http.patch(`https://pasha2-fe82f-default-rtdb.firebaseio.com/products/${id}.json`, value).subscribe();

  }

  getProduct(): Observable<any> {
    return this.http.get('https://pasha2-fe82f-default-rtdb.firebaseio.com/products.json');

  }


}
