import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';


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
import {ServicesComponent} from './shell/main/services/services.component';
import {AboutComponent} from './shell/main/about/about.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FilterService} from './shared/services/filter.service';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FilterComponent,
        MainComponent,
        ProductsGridComponent,
        ProductDetailComponent,
        FooterComponent,
        ServicesComponent,
        AboutComponent,
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
        FlexLayoutModule
    ],
    providers: [FilterService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
