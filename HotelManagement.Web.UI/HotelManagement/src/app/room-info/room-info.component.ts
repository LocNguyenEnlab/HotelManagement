import {Component, OnInit, ViewChild} from '@angular/core';
import {RoomModel} from '../models/RoomModel';
import {InvoiceModel} from '../models/InvoiceModel';
import {InvoiceService} from '../services/invoice.service';
import {RoomService} from '../services/room.service';
import {ServiceModel} from '../models/ServiceModel';
import {ServiceTypeModel} from '../models/ServiceTypeModel';
import notify from 'devextreme/ui/notify';
import {ServiceService} from '../services/service.service';
import {ClientService} from '../services/client.service';

@Component({
    selector: 'app-check-out',
    templateUrl: './room-info.component.html',
    styleUrls: ['./room-info.component.scss']
})
export class RoomInfoComponent implements OnInit {
    @ViewChild('serviceGrid', {static: false}) serviceGrid;
    isVisiblePersonalCheckoutPopup = false;
    titlePersonalCheckout: string;
    room: RoomModel = new RoomModel();
    invoice: InvoiceModel = new InvoiceModel();
    serviceSource: ServiceModel[] = [];
    serviceQuantitySource: number[] = [];
    serviceTypeSource: ServiceTypeModel[] = [];

    constructor(
        private invoiceService: InvoiceService,
        private roomService: RoomService,
        private service: ServiceService,
        private clientService: ClientService,
    ) {}

    ngOnInit() {
        this.service.getServices().toPromise().then(data => {
            this.serviceSource = data;
        });
        this.serviceQuantitySource = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10];
        this.service.getServicesType().toPromise().then(data => {
            this.serviceTypeSource = data;
        });
        const allService: ServiceTypeModel = {id: -1, name: 'All Service', services: this.serviceSource};
        this.serviceTypeSource.push(allService);
    }

    async onInit(room: RoomModel) {
        this.titlePersonalCheckout = 'Room ' + room.name + ' (' + room.type + ')';
        room.checkinTime = new Date(room.checkinTime);
        room.checkoutTime = new Date();
        this.room = room;

        await this.invoiceService.getInvoiceByRoomName(this.room.name).toPromise().then(data => {
            this.invoice = data;
        });
    }

    cancelCheckout() {
        this.isVisiblePersonalCheckoutPopup = false;
    }

    async checkOut() {

        this.invoice.checkoutTime = this.room.checkoutTime;
        this.invoice.status = 'Paid';
        await this.invoiceService.exportInvoice(this.invoice).toPromise();
        for (const client of this.room.clients) {
            await this.clientService.delete(client.id).toPromise();
        }
        this.room.clients = [];
        this.room.status = 'Available';
        await this.roomService.updateRoom(this.room).toPromise();

        this.isVisiblePersonalCheckoutPopup = false;
    }
}
