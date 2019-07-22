import {Injectable} from '@angular/core';
import {ClientModel} from '../models/ClientModel';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    bookedClients: ClientModel[] = [];

    constructor() {
    }

    saveBookedClients(clients) {
        for (const client of clients) {
            this.bookedClients.push(client);
        }
    }

    getBookedClients(): ClientModel[] {
        return this.bookedClients;
    }
}
