import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';

@Injectable({providedIn: 'root'})
export class ProductService {
  products = [
    new ProductModel(
    'HOODED ZIP-FRONT JERSEY JACKET',
    'Our take on the classic hoodie, ' +
    'this zip-front jacket is rendered in an ultra-soft ' +
    'material giving it a luxurious feel. A necessity in any' +
    ' lounge or active wardrobe, this hoodie is the perfect layer ' +
    'for warming up at home, or for casual days out.' +
    ' Trust us — in our most comfortable material yet, you\'ll want ' +
    'one in every color.',
    'JACKET',
    '79.50',
    'white',
   [
     '1.png',
    '2.png'
   ]
  ),
  ];

  constructor() {
  }

}
