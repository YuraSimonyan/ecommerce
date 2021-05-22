import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ProductState} from '../../../../shared/store/product.state';
import {Observable} from 'rxjs';
import {GetProductsAction} from '../../../../shared/store/product.action';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-edit-list-products',
  templateUrl: './edit-list-products.component.html',
  styleUrls: ['./edit-list-products.component.scss']
})
export class EditListProductsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'date'];
  dataSource: any;

  constructor(private store: Store) {
  }

  @Select(ProductState.productData)
  $products: Observable<any>;

  ngOnInit(): void {
    this.store.dispatch(new GetProductsAction());
    this.$products.subscribe((value) => {
      this.dataSource = new MatTableDataSource(value);
    });
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  go(event: MouseEvent) {
    console.log(event.target);
  }
}
