import {Injectable} from '@angular/core';
import {BookedClientsListModel} from '../models/BookedClientsListModel';
import {RoomModel} from '../models/RoomModel';

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

    addBookedClientList(bookedClient: BookedClientsListModel) {
        if (this.bookedClientsList.length === 0) {
            bookedClient.id = 0;
        } else {
            bookedClient.id = this.bookedClientsList[this.bookedClientsList.length - 1].id + 1;
        }
        this.bookedClientsList.push(bookedClient);
    }

    updateBookedClientList(bookedClient: BookedClientsListModel) {
        const index = this.bookedClientsList.findIndex(s => s.id === bookedClient.id);
        this.bookedClientsList.splice(index, 1);
        this.bookedClientsList.splice(index, 0, bookedClient);
    }

    getBookedClientByCode(code: string) {
        return this.bookedClientsList.find(s => s.code === code).id;
    }

    getBookedClientByRoomName(roomName: string) {
        for (const bookedClient of this.bookedClientsList) {
            const rooms: RoomModel[] = bookedClient.rooms;
            if (rooms.find(s => s.name === roomName)) {
                return bookedClient.id;
            }
        }
    }
}
