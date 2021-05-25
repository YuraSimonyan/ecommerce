import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})
export class ProductService {
  styleList = ['Плаття', 'Штани', 'Спортивний одяг',
    'Куртки', 'Пальта', 'Футболки',
    'Майки', 'кардигани', 'шорти', 'комбенізони',
    'Халати', 'блузки', 'спідниці', 'жилетки', 'спецодяг', 'сумки'];

  constructor() {
  }



}
