import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductModel} from '../../../../shared/models/product.model';
import {DatePipe} from '@angular/common';
import {FilterService} from '../../../../shared/services/filter.service';
import {HttpService} from '../../../../shared/services/http.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarComponent} from '../../../../shared/snack-bar/snack-bar/snack-bar.component';
import {HttpResponse} from '@angular/common/http';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss'],

})
export class AddProductComponent implements OnInit {
    productForm: FormGroup;
    listStyles = this.filterService.styleList;

    constructor(public datePipe: DatePipe,
                public filterService: FilterService,
                public readonly httpService: HttpService,
                private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.productForm = new FormGroup({
            title: new FormControl('', [Validators.required, Validators.min(6), Validators.max(20)]),
            description: new FormControl('', Validators.required),
            style: new FormControl('', Validators.required),
            price: new FormControl('', [Validators.required]),
            materialName: new FormControl('', [Validators.required, Validators.max(20)]),
            photos: new FormArray([])
        });
    }

    addProduct(): void {
        if (this.productForm.valid) {
            this.httpService.addValueDataBase(new ProductModel(
                this.productForm.get('title').value,
                this.productForm.get('description').value,
                this.productForm.get('style').value,
                this.productForm.get('price').value,
                false,
                null,
                this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
                this.productForm.get('materialName').value,
                this.productForm.get('photos').value
            )).subscribe((response: HttpResponse<any>) => {
                if (response.ok) {
                    this.snackBar.openFromComponent(SnackBarComponent, {duration: 1000, data: {message: 'Продукт добавлен'}});
                    this.productForm.reset();
                    for (const key in this.productForm.controls) {
                        this.productForm.get(key).clearValidators();
                        this.productForm.get(key).updateValueAndValidity();
                    }
                    (this.productForm.get('photos') as FormArray).clear();
                }

            });
        }

    }

    onFileSelected(event): void {
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

    onReset(): void {
        this.productForm.reset();
        for (const key in this.productForm.controls) {
            this.productForm.get(key).clearValidators();
            this.productForm.get(key).updateValueAndValidity();
        }
        (this.productForm.get('photos') as FormArray).clear();
    }

}
