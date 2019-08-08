import {Component, OnInit, ViewChild} from '@angular/core';
import {RoomModel} from '../models/RoomModel';
import {ClientModel} from '../models/ClientModel';
import notify from 'devextreme/ui/notify';
import {RoomService} from '../services/room.service';
import {Router} from '@angular/router';
import {ServiceModel} from '../models/ServiceModel';
import {ServiceService} from '../services/service.service';
import {ServiceTypeModel} from '../models/ServiceTypeModel';
import {InvoiceService} from '../services/invoice.service';
import {InvoiceModel} from '../models/InvoiceModel';
import {ClientService} from '../services/client.service';
import {ServiceOfInvoiceModel} from '../models/ServiceOfInvoiceModel';

@Component({
    selector: 'app-check-in',
    templateUrl: './check-in.component.html',
    styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {
    @ViewChild('serviceBox', {static: false}) serviceBox;
    @ViewChild('quantityBox', {static: false}) quantityBox;
    @ViewChild('typeBox', {static: false}) typeBox;
    isVisiblePersonalCheckinPopup = false;
    titlePersonalCheckin: string;
    serviceValue: ServiceModel;
    serviceSource: ServiceModel[] = [];
    serviceQuantitySource: number[] = [];
    serviceQuantityValue: number = null;
    serviceTypeSource: ServiceTypeModel[] = [];
    roomCheckin: RoomModel = new RoomModel();
    invoice: InvoiceModel = new InvoiceModel();
    client: ClientModel = new ClientModel();
    currentPrice: number;

    constructor(
        private roomService: RoomService,
        private router: Router,
        private service: ServiceService,
        private invoiceService: InvoiceService,
        private clientService: ClientService,
    ) {
        this.setPrice = this.setPrice.bind(this);
        this.setTotalAmount = this.setTotalAmount.bind(this);
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

    async onInit(clientCheckin: ClientModel) {
        if (clientCheckin != null) {
             await this.roomService.getRoom(clientCheckin.roomName).toPromise().then(data => {
                 this.roomCheckin = data;
             });
             await this.clientService.getClientsByRoomName(this.roomCheckin.name).toPromise().then(data => {
                 this.roomCheckin.clients = data;
             });
             this.titlePersonalCheckin = 'Personal checkin for room ' + this.roomCheckin.name + ' (' + this.roomCheckin.type + ')';
             this.invoice.discount = this.roomCheckin.clients[0].discount;
             this.invoice.prepay = this.roomCheckin.clients[0].prepay;
             this.roomCheckin.checkinTime = new Date();
        }
    }

    cancel() {
        this.isVisiblePersonalCheckinPopup = false;
    }

    async checkinForPersonal() {
        if (this.roomCheckin.clients) {
            this.roomCheckin.status = 'Checked in';
            this.createInvoice();
            await this.invoiceService.addInvoice(this.invoice).toPromise().then();
            for (const client of this.roomCheckin.clients) {
                client.status = 'Checked in';
                await this.clientService.update(client).toPromise().then();
            }
            await this.roomService.updateRoom(this.roomCheckin).toPromise().then();
            notify('Checkin successfully', 'success');
            this.isVisiblePersonalCheckinPopup = false;
            window.location.reload();
        } else {
            notify('Please add clients for this room!', 'error');
        }
    }

    createInvoice() {
        let totalPayment: number;
        let totalRoomMoney: number;
        let totalServiceMoney = 0;
        const rentTime = Math.ceil((new Date(this.roomCheckin.checkoutTime).getTime() -
            new Date(this.roomCheckin.checkinTime).getTime()) / (24 * 60 * 60 * 1000));
        for (const service of this.invoice.servicesOfInvoice) {
            totalServiceMoney += service.totalAmount;
        }
        totalRoomMoney = this.roomCheckin.price * rentTime;
        totalPayment = totalRoomMoney + totalServiceMoney - this.invoice.prepay - this.invoice.discount;
        this.invoice.clients = this.roomCheckin.clients;
        this.invoice.rentTime = rentTime;
        this.invoice.totalRoomAmount = totalRoomMoney;
        this.invoice.totalAmount = totalPayment;
        this.invoice.totalServiceAmount = totalServiceMoney;
        this.invoice.status = 'Unpaid';
        this.invoice.checkinTime = this.roomCheckin.checkinTime;
        this.invoice.checkoutTime = this.roomCheckin.checkoutTime;
    }

    addClientInfoOfPersonalBooking() {
        if (!this.roomCheckin.clients) {
            this.roomCheckin.clients = [];
        }
        if ((this.roomCheckin.type === 'Single' && this.roomCheckin.clients.length < 2) || this.roomCheckin.type === 'Double') {
            const clientTemp: ClientModel = Object.assign({}, this.client);
            this.roomCheckin.clients.push(clientTemp);
            // this.resetClientInput();
        } else {
            notify('Can not add more than one client for Single room!', 'warning');
        }
    }

    addService() {
        if (this.serviceQuantityValue != null && this.serviceValue != null) {
            if (!this.invoice.servicesOfInvoice) {
                this.invoice.servicesOfInvoice = [];
            }
            const serviceOfInvoice: ServiceOfInvoiceModel = this.invoice.servicesOfInvoice.find(_ => _.serviceId === this.serviceValue.id);
            if (serviceOfInvoice) {
                serviceOfInvoice.quantity += this.serviceQuantityValue;
                serviceOfInvoice.totalAmount = this.serviceValue.price * serviceOfInvoice.quantity;
            } else {
                const serviceInvoice: ServiceOfInvoiceModel = new ServiceOfInvoiceModel();
                serviceInvoice.quantity = this.serviceQuantityValue;
                serviceInvoice.totalAmount = serviceInvoice.quantity * this.serviceValue.price;
                serviceInvoice.serviceId = this.serviceValue.id;
                serviceInvoice.service = this.serviceValue;
                this.invoice.servicesOfInvoice.push(serviceInvoice);
            }
        } else {
            notify('Please select service and quantity of it', 'error');
        }
    }

    setPrice(rowData: ServiceOfInvoiceModel, value) {
        rowData.service = rowData.service || new ServiceModel();
        rowData.serviceId = value;
        const service = this.serviceSource.find(_ => _.id === value);
        rowData.service = service;
        if (service) {
            rowData.service.price = service.price;
            this.currentPrice = service.price;
        }
    }

    setTotalAmount(rowData: ServiceOfInvoiceModel, value) {
        rowData.totalAmount = this.currentPrice * value;
        rowData.quantity = value;
    }
}
