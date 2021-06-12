import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {GetProductsActionById} from '../../../../../../shared/store/product.action';
import {ProductState} from '../../../../../../shared/store/product.state';
import {Observable} from 'rxjs';
import {ProductModel} from '../../../../../../shared/models/product.model';
import {ProductService} from '../../../../../../shared/services/product.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {EditProductService} from '../../../../../../shared/services/edit-product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  productId;

  listStyles = this.productService.styleList;
  product: ProductModel;

  @Select(ProductState.productItem)
  $productData: Observable<any>;

  productForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private productService: ProductService,
    private datePipe: DatePipe,
    private editProductService: EditProductService
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
        this.product = value;
        this.productForm.get('material').get('materialPhoto').setValue(this.product?.material?.materialPhoto);
        const arrayPhotos = this.productForm.get('photos') as FormArray;
        if (this.product.img) {
          for (const photo of this.product.img) {
            arrayPhotos.push(new FormControl(photo));
          }
        }

      }
    );
  }

  editProduct(): void {
    const editedProduct = new ProductModel(
      this.productForm.get('title').value,
      this.productForm.get('description').value,
      this.productForm.get('style').value,
      '₴' + this.productForm.get('price').value,
      (!!this.productForm.get('promotedPrice').value),
      this.productForm.get('promotedPrice').value,
      this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      this.productForm.get('material').value,
      this.productForm.get('photos').value);
    this.editProductService.editProduct(editedProduct, this.productId);
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
