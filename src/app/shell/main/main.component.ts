import {Component, OnInit} from '@angular/core';
import {FilterService} from '../../shared/services/filter.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private filterService: FilterService) {
  }

  ngOnInit(): void {
  }


  sortHigh(): void {
    this.filterService.sortState.next('high');
  }

  sortLow(): void {
    this.filterService.sortState.next('low');
  }
}
