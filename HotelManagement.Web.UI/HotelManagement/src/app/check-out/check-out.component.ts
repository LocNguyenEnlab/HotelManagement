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

@Component({
    selector: 'app-check-out',
    templateUrl: './check-out.component.html',
    styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
    @ViewChild('serviceBox', {static: false}) serviceBox;
    @ViewChild('quantityBox', {static: false}) quantityBox;
    @ViewChild('typeBox', {static: false}) typeBox;
    isVisiblePersonalCheckoutPopup = false;
    titlePersonalCheckout: string;
    roomCheckout: RoomModel = new RoomModel();
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
        private roomService: RoomService,
        private service: ServiceService,
        private clientService: ClientService,
    ) {
    }

    ngOnInit() {
    }

    onInit(roomCheckout: RoomModel) {
        this.roomCheckout = roomCheckout;
        this.invoice = this.invoiceService.getInvoiceByRoomName(this.roomCheckout.name);
        this.titlePersonalCheckout = 'Checkout for Room ' + this.roomCheckout.name;
        this.serviceSource = this.service.getServices();
        this.serviceQuantitySource = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10];
        this.serviceTypeSource = this.service.getServicesType();
    }

    cancelCheckout() {
        this.isVisiblePersonalCheckoutPopup = false;
    }

    checkOut() {
        const result = confirm('Are you sure check out this room?', 'Confirm');
        result.then((dialogResult) => {
            if (dialogResult) {
                this.invoice.status = 'Paid';
                this.invoiceService.updateInvoice(this.invoice);
                this.roomCheckout.clients = [];
                this.roomCheckout.status = 'Available';
                this.roomCheckout.checkinTime = new Date();
                this.roomCheckout.checkoutTime = new Date();
                this.roomService.updateRoom(this.roomCheckout);
                this.isVisiblePersonalCheckoutPopup = false;

                // this.bookedClientService.deleteByRoomName(this.roomCheckout.name);
            }
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
        this.serviceTypeName = event.addedItems[0].typeName;
        // @ts-ignore
        this.serviceSource = this.service.getServicesByTypeId(event.addedItems[0].id);
        this.serviceName = null;
        this.typeBox.instance.close();
    }

    addService() {
        if (this.serviceQuantityValue != null && this.serviceValue != null) {
            const service: ServiceModel = this.invoice.services.find(_ => _.id === this.serviceValue.id);
            if (service) {
                service.quantity += this.serviceQuantityValue;
                service.totalMoney = service.price * service.quantity;
                if (service.quantity === 0) {
                    const index = this.invoice.services.findIndex(_ => _.id === this.serviceValue.id);
                    this.invoice.services.splice(index, 1);
                }
            } else {
                this.serviceValue.quantity = this.serviceQuantityValue;
                this.serviceValue.totalMoney = this.serviceValue.quantity * this.serviceValue.price;
                this.invoice.services.push(this.serviceValue);
            }
            this.invoice.totalServiceMoney += (this.serviceValue.price * this.serviceQuantityValue);
            this.invoice.totalPayment += (this.serviceValue.price * this.serviceQuantityValue);
            this.roomService.updateRoom(this.roomCheckout);
            this.invoiceService.updateInvoice(this.invoice);
        } else {
            notify('Please select service and quantity of it', 'error');
        }
    }

}
