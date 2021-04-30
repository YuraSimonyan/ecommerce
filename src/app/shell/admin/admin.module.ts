import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrudctsAdminComponent } from './prudcts-admin/prudcts-admin.component';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [PrudctsAdminComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AdminModule { }
