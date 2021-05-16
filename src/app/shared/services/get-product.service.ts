import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class GetProductService {
  constructor(private http: HttpClient) {
  }

  getProduct(): Observable<any> {

    return this.http.get('https://pash1-70445-default-rtdb.firebaseio.com/products.json');

  }

}
