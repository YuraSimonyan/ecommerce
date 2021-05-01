import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductModel} from '../../../../shared/models/product.model';
import {AddProductService} from '../../../../shared/services/add-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  styleList = ['Штаны', 'платья', 'спортивная одежда',
    'куртки', 'пальта', 'шубы', 'постельное', 'футболки',
    'майки', 'кардиганы', 'лосины', 'шорты', 'комбенизоны',
    'халаты', 'блузки', 'юбки', 'жилетки', 'спецодежда', 'сумки'];

  constructor(private addProductService: AddProductService) {
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
    this.addProductService.addValueDataBase(new ProductModel(
      this.productForm.get('title').value,
      this.productForm.get('description').value,
      this.productForm.get('style').value,
      this.productForm.get('price').value,
      this.productForm.get('material').value,
      this.productForm.get('photos').value,
    )).subscribe(value => console.log(value));
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
