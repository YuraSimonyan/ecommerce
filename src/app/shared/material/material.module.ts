import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
exports: [
  MatInputModule,
  MatIconModule,
  MatExpansionModule,
  MatSelectModule,
  MatGridListModule,
  MatCardModule,
  MatTabsModule
]

})
export class MaterialModule{}
