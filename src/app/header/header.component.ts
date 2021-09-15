import {Component} from '@angular/core';
import {FilterService} from '../shared/services/filter.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    constructor(public readonly filterService: FilterService) {
    }

}
