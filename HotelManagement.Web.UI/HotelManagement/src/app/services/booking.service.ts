import {Injectable} from '@angular/core';
import {ClientModel} from '../models/ClientModel';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    clients: ClientModel[] = [];
    constructor() {
    }

    saveClients(clients) {
        this.clients.push(clients);
    }
}
