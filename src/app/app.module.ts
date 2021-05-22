import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxsModule} from '@ngxs/store';

import {SharedModule} from './shared/shared.module';
import {FilterComponent} from './shell/main/filter/filter.component';
import {CommonModule} from '@angular/common';
import {MainComponent} from './shell/main/main.component';
import {ProductsGridComponent} from './shell/main/products-grid/products-grid.component';
import {AdminModule} from './shell/admin/admin.module';
import {ProductDetailComponent} from './shell/main/product-detail/product-detail.component';
import {environment} from '../environments/environment';
import {ProductState} from './shared/store/product.state';
import {FooterComponent} from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterComponent,
    MainComponent,
    ProductsGridComponent,
    ProductDetailComponent,
    FooterComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([ProductState]),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production
    }),
    MatIconModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
