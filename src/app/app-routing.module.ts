import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './shell/main/main.component';
import {AdminPageComponent} from './shell/admin/admin/admin-page.component';
import {ProductDetailComponent} from './shell/main/product-detail/product-detail.component';
import {EditProductComponent} from './shell/admin/admin/edit-products/edit-product/edit-product/edit-product.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: 'admin/edit-product/:id', component: EditProductComponent},
  {path: 'details/:id', component: ProductDetailComponent},
  {path: '**', component: MainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
