import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import { FilterComponent } from './shell/filter/filter.component';
import {CommonModule} from '@angular/common';
import { MainComponent } from './shell/main/main.component';
import { ProductsGridComponent } from './shell/main/products-grid/products-grid.component';
import {HttpClientModule} from '@angular/common/http';
import {AdminModule} from './shell/admin/admin.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterComponent,
    MainComponent,
    ProductsGridComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
