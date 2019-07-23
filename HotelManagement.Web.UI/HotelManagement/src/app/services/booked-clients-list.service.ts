import {Injectable} from '@angular/core';
import {BookedClientsListModel} from '../models/BookedClientsListModel';

@Injectable({
    providedIn: 'root'
})
export class BookedClientsListService {
    bookedClientsList: BookedClientsListModel[] = [];

    constructor() {
    }

    getBookedClientsList(): BookedClientsListModel[] {
        return this.bookedClientsList;
    }

    saveBookedClientsList(bookedClients) {
        this.bookedClientsList.push(bookedClients);
    }
}
