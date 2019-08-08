import {Component, OnInit, ViewChild} from '@angular/core';
import {RoomModel} from '../models/RoomModel';
import {InvoiceModel} from '../models/InvoiceModel';
import {InvoiceService} from '../services/invoice.service';
import {RoomService} from '../services/room.service';
import {ServiceModel} from '../models/ServiceModel';
import {ServiceTypeModel} from '../models/ServiceTypeModel';
import notify from 'devextreme/ui/notify';
import {ServiceService} from '../services/service.service';
import {confirm} from 'devextreme/ui/dialog';
import {ClientService} from '../services/client.service';
import {ServiceOfInvoiceModel} from '../models/ServiceOfInvoiceModel';

@Component({
    selector: 'app-check-out',
    templateUrl: './check-out.component.html',
    styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
    @ViewChild('serviceGrid', {static: false}) serviceGrid;
    isVisiblePersonalCheckoutPopup = false;
    titlePersonalCheckout: string;
    roomCheckout: RoomModel = new RoomModel();
    invoice: InvoiceModel = new InvoiceModel();
    serviceSource: ServiceModel[] = [];
    serviceQuantitySource: number[] = [];
    serviceTypeSource: ServiceTypeModel[] = [];

    constructor(
        private invoiceService: InvoiceService,
        private roomService: RoomService,
        private service: ServiceService,
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

    async onInit(roomCheckout: RoomModel) {
        this.titlePersonalCheckout = 'Checkout for Room ' + roomCheckout.name;
        roomCheckout.checkinTime = new Date(roomCheckout.checkinTime);
        roomCheckout.checkoutTime = new Date();
        this.roomCheckout = roomCheckout;

        await this.invoiceService.getInvoiceByRoomName(this.roomCheckout.name).toPromise().then(data => {
            this.invoice = data;
        });
    }

    cancelCheckout() {
        this.isVisiblePersonalCheckoutPopup = false;
    }

    async checkOut() {
        // const result = confirm('Are you sure check out this room?', 'Confirm');
        // result.then((dialogResult) => {
        //     if (dialogResult) {
        //         this.invoice.status = 'Paid';
        //         this.invoiceService.updateInvoice(this.invoice).subscribe();
        //         this.roomCheckout.clients = [];
        //         this.roomCheckout.status = 'Available';
        //         this.roomCheckout.checkinTime = new Date();
        //         this.roomCheckout.checkoutTime = new Date();
        //         this.roomService.updateRoom(this.roomCheckout);
        //         this.isVisiblePersonalCheckoutPopup = false;
        //     }
        // });
        await this.invoiceService.exportInvoice(this.invoice).toPromise().then();
        this.isVisiblePersonalCheckoutPopup = false;
    }
}
