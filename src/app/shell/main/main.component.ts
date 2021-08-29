import {Component, HostListener, OnInit} from '@angular/core';
import {FilterService} from '../../shared/services/filter.service';
import {MatDialog} from '@angular/material/dialog';
import {MainModalComponent} from '../../shared/main-modal/main-modal.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    constructor(
        private readonly filterService: FilterService,
        private readonly dialog: MatDialog,
    ) {
    }

    @HostListener('window:scroll', ['$event'])


    ngOnInit(): void {
    }

    onScroll(event): void {
        console.log(event);
        this.mainModal();
    }

    mainModal(): void {
        setTimeout(() => {
            if (window.pageYOffset > 40) {
                if (this.filterService.isModalOpen) {
                    return;
                }
                this.filterService.isModalOpen = true;
                this.dialog.open(MainModalComponent);
            }
        }, 5000);
    }

    public sortHigh(): void {
        this.filterService.sortHigh();
    }

    public sortLow(): void {
        this.filterService.sortLow();
    }
}
