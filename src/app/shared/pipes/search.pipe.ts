import {Pipe, PipeTransform} from '@angular/core';
import {ProductModel} from '../models/product.model';

@Pipe({name: 'searchFilter'})
export class SearchPipe implements PipeTransform {
    transform(items: ProductModel[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();

        return items.filter((it) => {
            return it.title.toLowerCase().includes(searchText);
        });
    }
}
