import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';
import {DatePipe} from '@angular/common';
import {ModalComponent} from './modal/modal.component';
import {MainModalComponent} from './main-modal/main-modal.component';
import {RouterModule} from '@angular/router';
import {SnackBarComponent} from './snack-bar/snack-bar/snack-bar.component';
import {SearchPipe} from './pipes/search.pipe';

@NgModule({
    declarations: [
        ModalComponent,
        MainModalComponent,
        SnackBarComponent,
        SearchPipe
    ],
    imports: [
        MaterialModule,
        RouterModule,

    ],
    providers: [DatePipe],
    exports: [MaterialModule, SearchPipe]
})
export class SharedModule {
}
