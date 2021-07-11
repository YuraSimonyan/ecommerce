import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class ProductService {
  isModalOpen = false;
  styleList = ['Плаття', 'Штани', 'Спортивний одяг',
    'Куртки', 'Пальта', 'Футболки',
    'Майки', 'кардигани', 'шорти', 'комбенізони',
    'Халати', 'блузки', 'спідниці', 'жилетки', 'спецодяг', 'сумки'];

  constructor(private http: HttpClient) {
  }

  addValueDataBase(value: ProductModel): Observable<any> {
    return this.http.post<ProductModel>('https://pasasa-fcc65-default-rtdb.firebaseio.com/products.json', value);

  }

  editProduct(value, id): void {
    this.http.patch(`https://pasasa-fcc65-default-rtdb.firebaseio.com/products/${id}.json`, value).subscribe();

  }

  getProduct(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>('https://pasasa-fcc65-default-rtdb.firebaseio.com/products.json');

  }


}
