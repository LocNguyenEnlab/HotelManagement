import {ClientModel} from './ClientModel';
import {ServiceModel} from './ServiceModel';

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
    prePay: number;
    checkinTime: Date;
    checkoutTime: Date;
    services: ServiceModel[];

    constructor() {
        this.id = 0;
        this.clients = [];
        this.rentTime = 0;
        this.totalServiceMoney = 0;
        this.totalRoomMoney = 0;
        this.totalPayment = 0;
        this.discount = 0;
        this.status = '';
        this.notes = '';
        this.prePay = 0;
        this.checkinTime = new Date();
        this.checkoutTime = new Date();
        this.services = [];
    }
}
