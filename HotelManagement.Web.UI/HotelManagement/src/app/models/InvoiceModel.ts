import {ClientModel} from './ClientModel';
import {ServiceModel} from './ServiceModel';
import {ServiceOfInvoiceModel} from './ServiceOfInvoiceModel';

export class InvoiceModel {
    id: number;
    clients: ClientModel[];
    rentTime: number;
    totalRoomMoney: number;
    totalServiceMoney: number;
    totalPayment: number;
    discount: number;
    status: string;
    notes: string;
    prepay: number;
    checkinTime: Date;
    checkoutTime: Date;
    serviceOfInvoice: ServiceOfInvoiceModel[];

    constructor() {
        this.clients = [];
        this.rentTime = 0;
        this.totalServiceMoney = 0;
        this.totalRoomMoney = 0;
        this.totalPayment = 0;
        this.discount = 0;
        this.status = '';
        this.notes = '';
        this.prepay = 0;
        this.checkinTime = new Date();
        this.checkoutTime = new Date();
        this.serviceOfInvoice = [];
    }
}
