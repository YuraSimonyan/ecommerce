import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductModel} from '../../../../shared/models/product.model';
import {DatePipe} from '@angular/common';
import {ProductService} from '../../../../shared/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  listStyles = this.productService.styleList;

  constructor(public datePipe: DatePipe, public productService: ProductService) {
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      style: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      material: new FormGroup({
        materialName: new FormControl(),
        materialPhoto: new FormArray([], Validators.required),
      }),
      photos: new FormArray([])
    });
  }

  addProduct(): void {
    this.productService.addValueDataBase(new ProductModel(
      this.productForm.get('title').value,
      this.productForm.get('description').value,
      this.productForm.get('style').value,
      this.productForm.get('price').value,
      false,
      null,
      this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      this.productForm.get('material').value,
      this.productForm.get('photos').value
    )).subscribe();
  }

  onFileSelected(event): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (event.target.classList.contains('materialImg')) {
          const arrayMaterial = this.productForm.get('material').get('materialPhoto') as FormArray;
          arrayMaterial.push(new FormControl(reader.result));
        }
        if (event.target.classList.contains('photoName')) {
          const arrayPhotos = this.productForm.controls.photos as FormArray;
          arrayPhotos.push(new FormControl(reader.result));
        }
      };
    }
  }
}
