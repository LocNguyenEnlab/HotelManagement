import {Component, OnInit, ViewChild} from '@angular/core';
import {ServiceTypeModel} from '../models/ServiceTypeModel';
import {ServiceService} from '../services/service.service';
import {ServiceModel} from '../models/ServiceModel';
import notify from 'devextreme/ui/notify';
import {ServiceOfInvoiceModel} from '../models/ServiceOfInvoiceModel';

@Component({
    selector: 'app-service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
    @ViewChild('selectBoxServiceType', {static: false}) selectBoxServiceType;
    isVisibleAddServicePopup = false;
    serviceTypeSource: ServiceTypeModel[] = [];
    serviceSource: ServiceModel[] = [];
    currentServiceType: ServiceTypeModel = new ServiceTypeModel();
    lookupColumnOptions = {
        acceptCustomValue: true,
        onCustomItemCreating: function(args) {
            this.currentServiceType.name = args.text;
            this.serviceTypeSource.unshift(this.currentServiceType);
            return this.currentServiceType;
        }.bind(this)
    };

    constructor(
        private serviceService: ServiceService,
    ) {
    }

    async ngOnInit() {
        await this.serviceService.getServicesType().toPromise().then(data => {
            this.serviceTypeSource = data;
        });
        await this.serviceService.getServices().toPromise().then(data => {
            this.serviceSource = data;
        });
        const allService: ServiceTypeModel = {id: -1, name: 'All Service', services: this.serviceSource};
        this.serviceTypeSource.push(allService);
    }

    ok() {
        this.isVisibleAddServicePopup = false;
        window.location.reload();
    }

    async createService(e) {
        if (!e.data.serviceTypeId) {
            e.data.serviceType = this.currentServiceType;
        }
        await this.serviceService.add(e.data).toPromise();
    }

    async deleteService(e) {
        await this.serviceService.delete(e.data.id).toPromise();
    }

    async updateService(e) {
        await this.serviceService.update(e.data).toPromise();
    }
}
