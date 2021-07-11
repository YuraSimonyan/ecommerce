import {Component, HostListener, OnInit} from '@angular/core';
import {FilterService} from '../../shared/services/filter.service';
import {MatDialog} from '@angular/material/dialog';
import {MainModalComponent} from '../../shared/main-modal/main-modal.component';
import {ProductService} from '../../shared/services/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(public filterService: FilterService, private dialog: MatDialog, private productService: ProductService) {
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event): void {
    this.mainModal();
  }

  ngOnInit(): void {
  }

  mainModal(): void {
    setTimeout(() => {
      if (window.pageYOffset > 40) {
        if (this.productService.isModalOpen) {
          return;
        }
        this.productService.isModalOpen = true;
        this.dialog.open(MainModalComponent);
      }
    }, 4);
  }


  sortHigh(): void {
    this.filterService.sortState.next('high');
  }

  sortLow(): void {
    this.filterService.sortState.next('low');
  }
}
