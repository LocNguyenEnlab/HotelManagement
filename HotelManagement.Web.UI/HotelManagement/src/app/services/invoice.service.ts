import {Injectable} from '@angular/core';
import {InvoiceModel} from '../models/InvoiceModel';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {
    apiUrl = ApiService.apiUrl + 'invoice/';

    constructor(
        private http: HttpClient,
    ) {
    }

    addInvoice(invoice: InvoiceModel): Observable<InvoiceModel> {
        return this.http.post<InvoiceModel>(this.apiUrl, invoice);
    }

    updateInvoice(invoice: InvoiceModel) {

    }

    getInvoices(): Observable<InvoiceModel[]> {
        return this.http.get<InvoiceModel[]>(this.apiUrl);
    }

    getInvoiceByRoomName(roomName: string) {

    }
}
