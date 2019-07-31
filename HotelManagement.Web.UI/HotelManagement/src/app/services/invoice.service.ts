import {Injectable} from '@angular/core';
import {InvoiceModel} from '../models/InvoiceModel';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {
    invoices: InvoiceModel[] = [];
    id = 1;
    constructor() {
    }

    addInvoice(invoice: InvoiceModel) {
        invoice.id = this.id;
        this.invoices.push(invoice);
        this.id++;
    }

    updateInvoice(invoice: InvoiceModel) {
        const index = this.invoices.findIndex(_ => _.id === invoice.id);
        this.invoices.splice(index, 1);
        this.invoices.splice(index, 0, invoice);
    }

    getInvoices(): InvoiceModel[] {
        return this.invoices;
    }

    getInvoiceByRoomName(roomName: string) {
        return this.invoices.find(_ => _.room.name === roomName);
    }
}
