import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './shell/main/main.component';
import {ProductsAdminComponent} from './shell/admin/prudcts-admin/prudcts-admin.component';
import {ProductDetailComponent} from './shell/main/product-detail/product-detail.component';
import {FilterComponent} from './shell/main/filter/filter.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'admin', component: ProductsAdminComponent},
  {path: 'details/:id', component: ProductDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
