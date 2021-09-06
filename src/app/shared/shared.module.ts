import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';
import {DatePipe} from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { MainModalComponent } from './main-modal/main-modal.component';
import {RouterModule} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarComponent} from './snack-bar/snack-bar/snack-bar.component';

@NgModule({
  declarations: [ModalComponent, MainModalComponent, SnackBarComponent],
    imports: [MaterialModule, RouterModule],
  providers: [DatePipe],
  exports: [MaterialModule]
})
export class SharedModule {
}
