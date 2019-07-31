import {Component, OnInit} from '@angular/core';
import {InvoiceModel} from '../models/InvoiceModel';
import {InvoiceService} from '../services/invoice.service';

@Component({
    selector: 'app-invoice-list',
    templateUrl: './invoice-list.component.html',
    styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
    invoiceList: InvoiceModel[] = [];

    constructor(
        private invoiceService: InvoiceService,
    ) {
    }

    ngOnInit() {
        this.invoiceList = this.invoiceService.getInvoices();
    }

    customClientName(params) {
        let clientsName = '';
        for (const client of params.value) {
            clientsName += client.name + ', ';
        }
        return clientsName;
    }

}
