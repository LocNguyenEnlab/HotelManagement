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
    serviceSource: ServiceModel[] = [];
    serviceQuantitySource: number[] = [];
    serviceTypeSource: ServiceTypeModel[] = [];
    roomCheckin: RoomModel = new RoomModel();
    invoice: InvoiceModel = new InvoiceModel();
    client: ClientModel = new ClientModel();
    currentPrice: number;
    walkingCheckin = false;

    constructor(
        private roomService: RoomService,
        private router: Router,
        private service: ServiceService,
        private invoiceService: InvoiceService,
        private clientService: ClientService,
    ) {
        this.setPrice = this.setPrice.bind(this);
        this.setTotalAmount = this.setTotalAmount.bind(this);
        this.getFilteredServices = this.getFilteredServices.bind(this);
        this.setServiceType = this.setServiceType.bind(this);
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

    onInit(room: RoomModel) {
        if (room.clients.length) {
            this.roomCheckin = room;
            this.titlePersonalCheckin = 'Checkin for room ' + this.roomCheckin.name + ' (' + this.roomCheckin.type + ')';
            this.invoice.discount = this.roomCheckin.clients[0].discount;
            this.invoice.prepay = this.roomCheckin.clients[0].prepay;
            this.roomCheckin.checkinTime = new Date();
        } else {
            this.walkingCheckin = true;
            room.checkinTime = new Date();
            room.checkoutTime = new Date();
            room.checkoutTime.setDate(new Date().getDate() + 1);
            room.checkoutTime.setHours(12, 0, 0);
            this.roomCheckin = room;
            this.titlePersonalCheckin = 'Checkin for room ' + this.roomCheckin.name + ' (' + this.roomCheckin.type + ')';
        }
    }

    cancel() {
        this.isVisiblePersonalCheckinPopup = false;
    }

    async checkinForPersonal() {
        if (this.roomCheckin.clients) {
            if (this.roomCheckin.type === 'Double' || this.roomCheckin.clients.length < 2) {
                this.roomCheckin.status = 'Checked in';
                this.createInvoice();
                this.invoice.clients = null;
                await this.invoiceService.addInvoice(this.invoice).toPromise();
                for (const client of this.roomCheckin.clients) {
                    client.status = 'Checked in';
                    client.roomName = this.roomCheckin.name;
                    await this.invoiceService.getMaxId().toPromise().then(data => {
                        client.invoiceId = data;
                    });
                    if (client.id) {
                        await this.clientService.update(client).toPromise();
                    } else {
                        await this.clientService.addClient(client).toPromise();
                    }
                }
                this.roomCheckin.clients = null;
                await this.roomService.updateRoom(this.roomCheckin).toPromise();
                notify('Checkin successfully', 'success');
                this.isVisiblePersonalCheckinPopup = false;
                window.location.reload();
            } else {
                notify('Can not add more than 2 client for single room!', 'error');
            }
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

    setPrice(rowData: ServiceOfInvoiceModel, value) {
        rowData.service = rowData.service || new ServiceModel();
        rowData.serviceId = value;
        const service = this.serviceSource.find(_ => _.id === value);
        // rowData.service = service;
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
