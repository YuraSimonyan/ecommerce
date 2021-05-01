import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './shell/main/main.component';
import {ProductsAdminComponent} from './shell/admin/prudcts-admin/prudcts-admin.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'admin', component: ProductsAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
