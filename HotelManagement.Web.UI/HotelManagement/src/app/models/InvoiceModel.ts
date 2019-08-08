import {ClientModel} from './ClientModel';
import {ServiceOfInvoiceModel} from './ServiceOfInvoiceModel';

export class InvoiceModel {
    id: number;
    clients: ClientModel[];
    rentTime: number;
    totalRoomAmount: number;
    totalServiceAmount: number;
    totalAmount: number;
    discount: number;
    status: string;
    notes: string;
    prepay: number;
    checkinTime: Date;
    checkoutTime: Date;
    servicesOfInvoice: ServiceOfInvoiceModel[];

    constructor() {
        this.clients = [];
        this.rentTime = 0;
        this.totalServiceAmount = 0;
        this.totalRoomAmount = 0;
        this.totalAmount = 0;
        this.discount = 0;
        this.status = '';
        this.notes = '';
        this.prepay = 0;
        this.checkinTime = new Date();
        this.checkoutTime = new Date();
        this.servicesOfInvoice = [];
    }
}
