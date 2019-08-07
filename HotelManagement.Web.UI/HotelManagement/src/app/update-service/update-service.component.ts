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
    serviceValue: ServiceModel;
    serviceSource: ServiceModel[] = [];
    serviceName: string = null;
    serviceQuantitySource: number[] = [];
    serviceQuantityValue: number = null;
    serviceTypeSource: ServiceTypeModel[] = [];
    serviceTypeName: string = null;

    constructor(
        private invoiceService: InvoiceService,
        private service: ServiceService,
    ) {}

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

    chooseService(event: Event) {
        // @ts-ignore
        this.serviceValue = event.addedItems[0];
        this.serviceName = this.serviceValue.name;
        this.serviceBox.instance.close();
    }

    chooseQuantity(event: Event) {
        // @ts-ignore
        this.serviceQuantityValue = event.addedItems[0];
        this.quantityBox.instance.close();
    }

    chooseServiceType(event: Event) {
        // @ts-ignore
        this.serviceTypeName = event.addedItems[0].name;
        // @ts-ignore
        this.serviceSource = this.serviceTypeSource.find(_ => _.id === event.addedItems[0].id).services;
        this.serviceName = null;
        this.typeBox.instance.close();
    }

    addService() {
        if (this.serviceQuantityValue != null && this.serviceValue != null) {
            if (!this.invoice.servicesOfInvoice) {
                this.invoice.servicesOfInvoice = [];
            }
            const serviceOfInvoice: ServiceOfInvoiceModel = this.invoice.servicesOfInvoice.find(_ => _.serviceId === this.serviceValue.id);
            if (serviceOfInvoice) {
                serviceOfInvoice.quantity += this.serviceQuantityValue;
                serviceOfInvoice.totalMoney = this.serviceValue.price * serviceOfInvoice.quantity;
            } else {
                const serviceInvoice: ServiceOfInvoiceModel = new ServiceOfInvoiceModel();
                serviceInvoice.quantity = this.serviceQuantityValue;
                serviceInvoice.totalMoney = serviceInvoice.quantity * this.serviceValue.price;
                serviceInvoice.serviceId = this.serviceValue.id;
                serviceInvoice.service = this.serviceValue;
                this.invoice.servicesOfInvoice.push(serviceInvoice);
            }
        } else {
            notify('Please select service and quantity of it', 'error');
        }
    }

    cancel() {
        this.isVisibleUpdateServicePopup = false;
    }

    async updateService() {
        let serviceMoney = 0;
        for (const service of this.invoice.servicesOfInvoice) {
            serviceMoney += service.totalMoney;
        }
        this.invoice.totalPayment = this.invoice.totalPayment - this.invoice.totalServiceMoney + serviceMoney;
        this.invoice.totalServiceMoney = serviceMoney;
        await this.invoiceService.updateInvoice(this.invoice).toPromise().then();
        this.isVisibleUpdateServicePopup = false;
    }
}
