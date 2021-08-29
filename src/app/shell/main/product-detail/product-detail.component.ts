import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {GetProductsActionById} from '../../../shared/store/product.action';
import {ProductState} from '../../../shared/store/product.state';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from '../../../shared/modal/modal.component';
import {ProductModel} from '../../../shared/models/product.model';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    id: string;
    @Select(ProductState.productItem)
    public productData: Observable<ProductModel>;
    public mainPageNum = 0;
    public showPage = false;
    public imgLength;
    public subscription: Subscription;


    constructor(
        private readonly router: ActivatedRoute,
        private readonly store: Store,
        private readonly dialog: MatDialog
    ) {
    }


    ngOnInit(): void {
        this.subscription = this.productData.subscribe(value => {
            this.imgLength = value?.img?.length;
            if (Object.keys(value).length !== 0) {
                this.showPage = true;
            }
        });
        this.id = this.router.snapshot.params['id'];
        this.store.dispatch(new GetProductsActionById(this.id));
    }

    onChangeImg(event, index): void {
        this.mainPageNum = index;
    }

    nextMainImg(): void {
        this.mainPageNum++;
        if (this.mainPageNum > this.imgLength - 1) {
            this.mainPageNum = 0;
        }
    }

    backMainImg(): void {
        this.mainPageNum--;
        if (this.mainPageNum < 0) {
            this.mainPageNum = this.imgLength - 1;
        }
    }

    openDialog(): void {
        this.dialog.open(ModalComponent);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
