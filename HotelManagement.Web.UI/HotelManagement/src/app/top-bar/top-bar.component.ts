import {Component, OnInit, ViewChild} from '@angular/core';
import {ServiceComponent} from '../room-service/service.component';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
    @ViewChild(ServiceComponent, {static: false}) addService;

    constructor() {
    }

    ngOnInit() {
    }

    openAddServicePopup() {
        this.addService.isVisibleAddServicePopup = true;
    }
}
