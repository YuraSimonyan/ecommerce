import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';
import {DatePipe} from '@angular/common';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [ModalComponent],
  imports: [MaterialModule],
  providers: [DatePipe],
  exports: [MaterialModule]
})
export class SharedModule {
}
