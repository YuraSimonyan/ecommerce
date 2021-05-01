import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

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

  constructor() {
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      style: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      material: new FormArray([], Validators.required),
      photos: new FormArray([])
    });
  }

  addProduct(): void {
    console.log(this.productForm.value);
  }

  onFileSelected(event): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (event.target.classList.contains('materialName')) {
          const arrayMaterial = this.productForm.controls.material as FormArray;
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
