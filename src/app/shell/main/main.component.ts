import {Component, OnInit} from '@angular/core';
import {AddProductService} from '../../shared/services/add-product.service';
import {GetProductService} from '../../shared/services/get-product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private addProductService: AddProductService, private getProductService: GetProductService) {
  }

  ngOnInit(): void {
    // this.addProductService.addValue();
    // this.getProductService.getProduct();
  }

}
