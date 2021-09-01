import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class HttpService {
    constructor(private readonly store: Store,
                private readonly http: HttpClient) {
    }


    addValueDataBase(value: ProductModel): Observable<ProductModel> {
        return this.http.post<ProductModel>('https://database-25cda-default-rtdb.firebaseio.com/products.json', value, {});
    }

    editProduct(value, id): void {
        this.http.patch(`https://database-25cda-default-rtdb.firebaseio.com/products/${id}.json`, value).subscribe();

    }

    getProduct(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>('https://database-25cda-default-rtdb.firebaseio.com/products.json');
    }

    public loginRequest(userData): Observable<object> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDm3eyzZ4vxlKQ60R0lI5ZZfMnqxUjYs3w', userData, {headers})

    }
}
