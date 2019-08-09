import {Component, OnInit, ViewChild} from '@angular/core';
import {InvoiceModel} from '../models/InvoiceModel';
import {ServiceModel} from '../models/ServiceModel';
import {ServiceTypeModel} from '../models/ServiceTypeModel';
import {InvoiceService} from '../services/invoice.service';
import {ServiceService} from '../services/service.service';
import {RoomModel} from '../models/RoomModel';
import {ServiceOfInvoiceModel} from '../models/ServiceOfInvoiceModel';
import notify from 'devextreme/ui/notify';

@Component({
    selector: 'app-update-service',
    templateUrl: './update-service.component.html',
    styleUrls: ['./update-service.component.scss']
})
export class UpdateServiceComponent implements OnInit {
    @ViewChild('serviceBox', {static: false}) serviceBox;
    @ViewChild('quantityBox', {static: false}) quantityBox;
    @ViewChild('typeBox', {static: false}) typeBox;
    isVisibleUpdateServicePopup = false;
    titleUpdateService: string;
    invoice: InvoiceModel = new InvoiceModel();
    serviceSource: ServiceModel[] = [];
    serviceQuantitySource: number[] = [];
    serviceTypeSource: ServiceTypeModel[] = [];
    currentPrice: number;

    constructor(
        private invoiceService: InvoiceService,
        private service: ServiceService,
    ) {
        this.setPrice = this.setPrice.bind(this);
        this.setTotalAmount = this.setTotalAmount.bind(this);
        this.setServiceType = this.setServiceType.bind(this);
        this.getFilteredServices = this.getFilteredServices.bind(this);
    }

    async ngOnInit() {
        await this.service.getServices().toPromise().then(data => {
            this.serviceSource = data;
        });
        this.serviceQuantitySource = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10];
        await this.service.getServicesType().toPromise().then(data => {
            this.serviceTypeSource = data;
        });
        const allService: ServiceTypeModel = {id: -1, name: 'All Service', services: this.serviceSource};
        this.serviceTypeSource.push(allService);

    }

    async onInit(roomUpdate: RoomModel) {
        this.titleUpdateService = 'Update service for room ' + roomUpdate.name;
        await this.invoiceService.getInvoiceByRoomName(roomUpdate.name).toPromise().then(data => {
            this.invoice = data;
        });
    }

    cancel() {
        this.isVisibleUpdateServicePopup = false;
    }

    async updateService() {
        let serviceMoney = 0;
        for (const service of this.invoice.servicesOfInvoice) {
            serviceMoney += service.totalAmount;
        }
        this.invoice.totalAmount = this.invoice.totalAmount - this.invoice.totalServiceAmount + serviceMoney;
        this.invoice.totalServiceAmount = serviceMoney;
        await this.invoiceService.updateInvoice(this.invoice).toPromise().then();
        this.isVisibleUpdateServicePopup = false;
    }

    setPrice(rowData: ServiceOfInvoiceModel, value) {
        rowData.service = rowData.service || new ServiceModel();
        rowData.serviceId = value;
        const service = this.serviceSource.find(_ => _.id === value);
        rowData.service = service;
        if (service) {
            rowData.service.price = service.price;
            this.currentPrice = service.price;
            rowData.totalAmount = this.currentPrice;
        }
    }

    setTotalAmount(rowData: ServiceOfInvoiceModel, value) {
        rowData.totalAmount = this.currentPrice * value;
        rowData.quantity = value;
    }

    setServiceType(rowData: any, value) {
        rowData.service = rowData.service || new ServiceModel();
        rowData.service.serviceTypeId = value;
    }

    setDefaultValue(e) {
        e.data.orderTime = new Date();
        e.data.quantity = 1;
    }

    getFilteredServices(options) {
        if (options.data) {
            if (options.data.service.serviceTypeId === -1) {
                return this.serviceSource;
            } else {
                return {
                    store: this.serviceSource,
                    filter: options.data ? ['serviceTypeId', '=', options.data.service.serviceTypeId] : null
                };
            }
        }
        return this.serviceSource;
    }
}
