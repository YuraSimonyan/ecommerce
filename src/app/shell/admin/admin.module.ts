import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsAdminComponent} from './prudcts-admin/prudcts-admin.component';
import {SharedModule} from '../../shared/shared.module';
import {AddProductComponent} from './prudcts-admin/add-product/add-product.component';
import {EditProductComponent} from './prudcts-admin/edit-product/edit-product.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ProductsAdminComponent,
    AddProductComponent,
    EditProductComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AdminModule {
}
