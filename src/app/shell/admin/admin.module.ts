import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AdminPageComponent} from './product-interactions/admin-page.component';
import {AddProductComponent} from './product-interactions/add-product/add-product.component';
import {EditProductComponent} from './product-interactions/edit-products/edit-product/edit-product/edit-product.component';
import {EditListProductsComponent} from './product-interactions/edit-products/edit-list-products.component';
import {LoginComponent} from './login/login.component';
import {FlexModule} from '@angular/flex-layout/typings/flex';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AuthService} from '../../shared/services/auth.service';
import {AuthGuard} from '../../shared/services/auth.guard';


@NgModule({
    declarations: [
        AdminPageComponent,
        EditListProductsComponent,
        AddProductComponent,
        EditProductComponent,
        LoginComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule,
        FlexLayoutModule,
    ],
    providers: [AuthService, AuthGuard]
})
export class AdminModule {
}
