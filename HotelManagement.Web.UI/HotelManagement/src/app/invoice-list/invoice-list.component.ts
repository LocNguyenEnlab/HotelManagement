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

    async ngOnInit() {
        await this.invoiceService.getInvoices().toPromise().then(data => {
            this.invoiceList = data;
        });
    }

    customClientName(params) {
        let clientsName = '';
        for (const client of params.value) {
            clientsName += client.name + ', ';
        }
        return clientsName;
    }

}
