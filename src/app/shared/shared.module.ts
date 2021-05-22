import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [],
 imports: [MaterialModule],
  providers: [DatePipe],
  exports: [MaterialModule]
})
export class SharedModule{}
