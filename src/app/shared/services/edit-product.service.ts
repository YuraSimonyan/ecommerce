import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class EditProductService {
  constructor(private http: HttpClient) {
  }

  editProduct(value, id): void {
      this.http.patch('https://pasha2-fe82f-default-rtdb.firebaseio.com/products/' + id + '.json', value).subscribe();
    }
  }
