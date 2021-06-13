import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';
import {DatePipe} from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { MainModalComponent } from './main-modal/main-modal.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [ModalComponent, MainModalComponent],
    imports: [MaterialModule, RouterModule],
  providers: [DatePipe],
  exports: [MaterialModule]
})
export class SharedModule {
}
