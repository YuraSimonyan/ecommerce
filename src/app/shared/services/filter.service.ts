import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class FilterService {
  filterState = new Subject();
  sortState = new Subject();
}
