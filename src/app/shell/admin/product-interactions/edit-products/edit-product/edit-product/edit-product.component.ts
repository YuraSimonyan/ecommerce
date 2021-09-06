import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {GetProductsActionById} from '../../../../../../shared/store/product.action';
import {ProductState} from '../../../../../../shared/store/product.state';
import {Observable} from 'rxjs';
import {ProductModel} from '../../../../../../shared/models/product.model';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {FilterService} from '../../../../../../shared/services/filter.service';
import {ProductService} from '../../../../../../shared/services/product.service';
import {HttpService} from '../../../../../../shared/services/http.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpResponse} from '@angular/common/http';
import {SnackBarComponent} from '../../../../../../shared/snack-bar/snack-bar/snack-bar.component';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, OnDestroy {
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
        private datePipe: DatePipe,
        private readonly productService: ProductService,
        private readonly httpService: HttpService,
        private readonly router: Router,
        private readonly snackBar: MatSnackBar
    ) {
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        this.productForm = new FormGroup({
            title: new FormControl(null, [Validators.required, Validators.min(6), Validators.max(20)]),
            description: new FormControl(null, [Validators.required, Validators.min(6), Validators.max(100)]),
            style: new FormControl(null, Validators.required),
            price: new FormControl(null, Validators.required),
            promotedPrice: new FormControl(),
            materialName: new FormControl(null, Validators.required),
            photos: new FormArray([], Validators.required),
        });
        this.productId = this.route.snapshot.params.id;
        this.store.dispatch(new GetProductsActionById(this.productId));
        this.setProductData();

    }

    public setProductData(): void {
        this.$productData.subscribe((value: ProductModel) => {
                this.productForm.get('title').setValue(value.title);
                this.productForm.get('description').setValue(value.description);
                this.productForm.get('style').setValue(value.style);
                this.productForm.get('price').setValue(value.price);
                this.productForm.get('promotedPrice').setValue(value.promotedPrice);
                this.productForm.get('materialName').setValue(value.materialName);
                const arrayPhotos = this.productForm.get('photos') as FormArray;
                if (value.img) {
                    for (const photo of value.img) {
                        arrayPhotos.push(new FormControl(photo));
                    }
                }

            }
        );
    }

    public editProduct(): void {
        if (this.productForm.valid) {
            const editedProduct = new ProductModel(
                this.productForm.get('title').value,
                this.productForm.get('description').value,
                this.productForm.get('style').value,
                this.productForm.get('price').value,
                (!!this.productForm.get('promotedPrice').value),
                this.productForm.get('promotedPrice').value,
                this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
                this.productForm.get('materialName').value,
                this.productForm.get('photos').value);
            this.httpService.editProduct(editedProduct, this.productId).subscribe((response: HttpResponse<any>) => {
                if (response.ok) {
                    this.snackBar.openFromComponent(SnackBarComponent, {duration: 1000, data: {message: 'Продукт изминен'}});
                }
            });
        }


    }

    public onFileSelected(event): void {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            const file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (event.target.classList.contains('photoName')) {
                    const arrayPhotos = this.productForm.controls.photos as FormArray;
                    arrayPhotos.push(new FormControl(reader.result));
                }
            };
        }
    }


    public removePhoto(i: number): void {
        const photosArray = this.productForm.get('photos') as FormArray;
        photosArray.removeAt(i);
    }


    public onReset(): void {
        this.setProductData();
    }

    public onDelete(): void {
        this.httpService.deleteItemById(this.productId).subscribe((response) => {
            if (response === null) {
                this.snackBar.openFromComponent(SnackBarComponent, {duration: 1000, data: {message: 'Товар удален'}})
                this.router.navigate(['/admin']).then();
            }
        });
    }
}
