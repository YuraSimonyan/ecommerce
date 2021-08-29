import {Injectable} from '@angular/core';
import {GetProductsAction} from '../store/product.action';
import {ProductModel} from '../models/product.model';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class HttpService {
    constructor(private readonly store: Store,
                private readonly http: HttpClient) {
    }




    addValueDataBase(value: ProductModel): Observable<ProductModel> {
        return this.http.post<ProductModel>('https://database-25cda-default-rtdb.firebaseio.com/products.json', value);
    }

    editProduct(value, id): void {
        this.http.patch(`https://database-25cda-default-rtdb.firebaseio.com/products/${id}.json`, value).subscribe();

    }

    getProduct(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>('https://database-25cda-default-rtdb.firebaseio.com/products.json');
    }
}
