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

    saveBookedClientsList(bookedClients: BookedClientsListModel) {
        if (this.bookedClientsList.length === 0) {
            bookedClients.id = 0;
        } else {
            bookedClients.id = this.bookedClientsList[this.bookedClientsList.length - 1].id + 1;
        }
        this.bookedClientsList.push(bookedClients);
    }

    getBookedClientByCode(code: string) {
        return this.bookedClientsList.findIndex(s => s.code === code);
    }

    getBookedClientByRoomName(roomName: string) {
        for (let i = 0; i < this.bookedClientsList.length; i++) {
            for (const clientRoomName of this.bookedClientsList[i].roomsName) {
                if (clientRoomName === roomName) {
                    return i;
                }
            }
        }
    }
}
