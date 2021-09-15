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


    public addValueDataBase(value: ProductModel): Observable<object> {
        return this.http.post<ProductModel>('https://database-25cda-default-rtdb.firebaseio.com/products.json', value, {observe: 'response' as 'body'});
    }

    public editProduct(value, id): Observable<object> {
        return this.http.patch(`https://database-25cda-default-rtdb.firebaseio.com/products/${id}.json`, value, {observe: 'response' as 'body'});

    }

    public getProduct(value): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(`https://database-25cda-default-rtdb.firebaseio.com/products.json?orderBy="$key"&limitToFirst=${value}`);
    }

    public loginRequest(userData): Observable<object> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDm3eyzZ4vxlKQ60R0lI5ZZfMnqxUjYs3w', userData, {headers});

    }

    public deleteItemById(id: string): Observable<any> {
        return this.http.delete(`https://database-25cda-default-rtdb.firebaseio.com/products/${id}.json`);
    }
}
