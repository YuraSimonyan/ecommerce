import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {GetProductsActionById} from '../../../../../../shared/store/product.action';
import {ProductState} from '../../../../../../shared/store/product.state';
import {Observable} from 'rxjs';
import {ProductModel} from '../../../../../../shared/models/product.model';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {FilterService} from '../../../../../../shared/services/filter.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  productId;

  listStyles = this.filterService.styleList;
  product: ProductModel;

  @Select(ProductState.productItem)
  $productData: Observable<any>;

  productForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private readonly filterService: FilterService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      style: new FormControl(),
      price: new FormControl(),
      promotedPrice: new FormControl(),
      material: new FormGroup({
        materialName: new FormControl(),
        materialPhoto: new FormControl(this.product?.material?.materialPhoto),
      }),
      photos: new FormArray([], Validators.required),
    });
    this.productId = this.route.snapshot.params['id'];
    this.store.dispatch(new GetProductsActionById(this.productId));
    this.$productData.subscribe((value: ProductModel) => {
        this.productForm.get('title').setValue(value.title);
        this.productForm.get('description').setValue(value.description);
        this.productForm.get('style').setValue(value.style);
        this.productForm.get('price').setValue(value.price);
        this.productForm.get('promotedPrice').setValue(value.promotedPrice);
        this.productForm.get('material').get('materialName').setValue(value.material?.materialName);
        this.productForm.get('material').get('materialPhoto').setValue(value.material?.materialPhoto);
        const arrayPhotos = this.productForm.get('photos') as FormArray;
        if (value.img) {
          for (const photo of value.img) {
            arrayPhotos.push(new FormControl(photo));
          }
        }

      }
    );
  }

  editProduct(): void {
    console.log(this.productForm);
    const editedProduct = new ProductModel(
      this.productForm.controls['title'].value,
      this.productForm.controls['description'].value,
      this.productForm.controls['style'].value,
      this.productForm.controls['price'].value,
      (!!this.productForm.controls['promotedPrice'].value),
      this.productForm.controls['promotedPrice'].value,
      this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      this.productForm.controls['material'].value,
      this.productForm.controls['photos'].value);
    this.filterService.editProduct(editedProduct, this.productId);
    console.log(editedProduct);
  }

  onFileSelected(event): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (event.target.classList.contains('materialImg')) {
          this.productForm.get('material').get('materialPhoto').setValue(reader.result);
        }
        if (event.target.classList.contains('photoName')) {
          const arrayPhotos = this.productForm.controls.photos as FormArray;
          arrayPhotos.push(new FormControl(reader.result));
        }
      };
    }
  }


  removePhoto(i: number): void {
    const photosArray = this.productForm.get('photos') as FormArray;
    photosArray.removeAt(i);
  }


}
