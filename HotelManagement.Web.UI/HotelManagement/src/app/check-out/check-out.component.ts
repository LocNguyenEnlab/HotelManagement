import {Component, OnInit} from '@angular/core';
import {RoomModel} from '../models/RoomModel';
import {InvoiceModel} from '../models/InvoiceModel';
import {InvoiceService} from '../services/invoice.service';

@Component({
    selector: 'app-check-out',
    templateUrl: './check-out.component.html',
    styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
    static isVisiblePersonalCheckoutPopup = false;
    titlePersonalCheckout: string;
    roomCheckout: RoomModel;
    invoice: InvoiceModel;

    constructor(
        private invoiceService: InvoiceService,
    ) {
    }

    ngOnInit() {
    }

    onInit(roomCheckout: RoomModel) {
        this.roomCheckout = roomCheckout;
        this.invoice = this.invoiceService.getInvoiceByRoomName(this.roomCheckout.name);
        this.titlePersonalCheckout = 'Checkout for Room ' + this.roomCheckout.name;
    }

    get staticIsVisiblePersonalCheckoutPopup() {
        return CheckOutComponent.isVisiblePersonalCheckoutPopup;
    }

}
