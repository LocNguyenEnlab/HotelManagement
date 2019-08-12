import {Component, OnInit} from '@angular/core';
import {ServiceTypeModel} from '../models/ServiceTypeModel';
import {ServiceService} from '../services/service.service';

@Component({
    selector: 'app-service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
    isVisibleAddServicePopup = false;
    serviceTypeSource: ServiceTypeModel[] = [];

    constructor(
        private serviceType: ServiceService,
    ) {
    }

    ngOnInit() {
        this.serviceType.getServicesType().subscribe(data => {
            this.serviceTypeSource = data;
        });
    }

}
