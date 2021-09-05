import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './shell/main/main.component';
import {AdminPageComponent} from './shell/admin/product-interactions/admin-page.component';
import {ProductDetailComponent} from './shell/main/product-detail/product-detail.component';
import {EditProductComponent} from './shell/admin/product-interactions/edit-products/edit-product/edit-product/edit-product.component';
import {ServicesComponent} from './shell/main/services/services.component';
import {AboutComponent} from './shell/main/about/about.component';
import {LoginComponent} from './shell/admin/login/login.component';
import {AuthGuard} from './shared/services/auth.guard';

const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard]},
    {path: 'admin/edit-product/:id', component: EditProductComponent},
    {path: 'details/:id', component: ProductDetailComponent},
    {path: 'services', component: ServicesComponent},
    {path: 'about', component: AboutComponent},
    {path: '**', component: MainComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
