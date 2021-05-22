import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  imports: [
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    MatListModule,
    MatChipsModule,
    MatTableModule,
    MatSortModule

  ],
  exports: [
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    MatListModule,
    MatChipsModule,
    MatTableModule,
    MatSortModule
  ],


})
export class MaterialModule {
}
