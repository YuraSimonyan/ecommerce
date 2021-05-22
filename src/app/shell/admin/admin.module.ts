import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AdminPageComponent} from './admin/admin-page.component';
import {AddProductComponent} from './admin/add-product/add-product.component';
import {EditProductComponent} from './admin/edit-products/edit-product/edit-product/edit-product.component';
import {EditListProductsComponent} from './admin/edit-products/edit-list-products.component';


@NgModule({
  declarations: [
    AdminPageComponent,
    EditListProductsComponent,
    AddProductComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class AdminModule {
}
