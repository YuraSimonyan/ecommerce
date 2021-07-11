import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class FilterService {
  filterState = new Subject();
  sortState = new Subject();
  fetchProducts = new Subject();
  clearFilter = new BehaviorSubject(null);
  filters = {
    style: '',
    price: {
      max: 0,
      min: 0
    }
  };
  appliedFilters = new BehaviorSubject(this.filters);
}
