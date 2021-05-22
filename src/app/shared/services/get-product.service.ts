import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class GetProductService {
  constructor(private http: HttpClient) {
  }

  getProduct(): Observable<any> {

    return this.http.get('https://pasha2-fe82f-default-rtdb.firebaseio.com/products.json');

  }

}
