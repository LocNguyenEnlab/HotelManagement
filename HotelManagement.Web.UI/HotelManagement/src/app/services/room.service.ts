import {Injectable} from '@angular/core';
import {RoomModel} from '../models/RoomModel';
import {FloorModel} from '../models/FloorModel';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    rooms: RoomModel[] = [
        {
            name: '100',
            status: 'Available',
            price: 300000,
            type: 'Double',
            clients: [],
            floor: '1',
            checkinTime: new Date(),
            checkoutTime: new Date(),
        },
        {
            name: '101',
            status: 'Available',
            price: 300045,
            type: 'Single',
            clients: [],
            floor: '1',
            checkinTime: new Date(),
            checkoutTime: new Date(),
        },
        {
            name: '102',
            status: 'Booking',
            price: 348000,
            type: 'Double',
            clients: [],
            floor: '1',
            checkinTime: new Date(),
            checkoutTime: new Date(),
        },
        {
            name: '200',
            status: 'Available',
            price: 400000,
            type: 'Single',
            clients: [],
            floor: '2',
            checkinTime: new Date(),
            checkoutTime: new Date(),
        },
        {
            name: '201',
            status: 'Available',
            price: 34500000,
            type: 'Single',
            clients: [],
            floor: '2',
            checkinTime: new Date(),
            checkoutTime: new Date(),
        },
        {
            name: '300',
            status: 'Available',
            price: 300000,
            type: 'Single',
            clients: [],
            floor: '3',
            checkinTime: new Date(),
            checkoutTime: new Date(),
        },
        {
            name: '301',
            status: 'Booked',
            price: 3000540,
            type: 'Single',
            clients: [],
            floor: '3',
            checkinTime: new Date(),
            checkoutTime: new Date(),
        },
        {
            name: '302',
            status: 'Available',
            price: 340000,
            type: 'Single',
            clients: [],
            floor: '3',
            checkinTime: new Date(),
            checkoutTime: new Date(),
        },
        {
            name: '303',
            status: 'Available',
            price: 300000,
            type: 'Single',
            clients: [],
            floor: '3',
            checkinTime: new Date(),
            checkoutTime: new Date(),
        },
    ];
    rooms1: RoomModel[] = [
        {
            name: '100',
            status: 'Available',
            price: 300000,
            type: 'Double',
            clients: null,
            floor: '1',
            checkinTime: new Date(),
            checkoutTime: new Date(),
        },
        {
            name: '101',
            status: 'Available',
            price: 300045,
            type: 'Single',
            clients: [],
            floor: '1',
            checkinTime: new Date(),
            checkoutTime: new Date(),
        },
        {
            name: '102',
            status: 'Booking',
            price: 348000,
            type: 'Double',
            clients: [],
            floor: '1',
            checkinTime: new Date(),
            checkoutTime: new Date(),
        },
    ];
    rooms2: RoomModel[] = [
        {
            name: '200',
            status: 'Available',
            price: 400000,
            type: 'Single',
            clients: [],
            floor: '2',
            checkinTime: new Date(),
            checkoutTime: new Date(),
        },
        {
            name: '201',
            status: 'Available',
            price: 34500000,
            type: 'Single',
            clients: [],
            floor: '2',
            checkinTime: new Date(),
            checkoutTime: new Date(),
        },
    ];
    rooms3: RoomModel[] = [
        {
            name: '300',
            status: 'Available',
            price: 300000,
            type: 'Single',
            clients: [],
            floor: '3',
            checkinTime: new Date(),
            checkoutTime: new Date(),
        },
        {
            name: '301',
            status: 'Booked',
            price: 3000540,
            type: 'Single',
            clients: [],
            floor: '3',
            checkinTime: new Date(),
            checkoutTime: new Date(),
        },
        {
            name: '302',
            status: 'Available',
            price: 340000,
            type: 'Single',
            clients: [],
            floor: '3',
            checkinTime: new Date(),
            checkoutTime: new Date(),
        },
        {
            name: '303',
            status: 'Available',
            price: 300000,
            type: 'Single',
            clients: [],
            floor: '3',
            checkinTime: new Date(),
            checkoutTime: new Date(),
        },
    ];
    floors: FloorModel[] = [
        {name: '1', rooms: this.rooms1},
        {name: '2', rooms: this.rooms2},
        {name: '3', rooms: this.rooms3},
    ];


    constructor() {
    }

    getFloors(): FloorModel[] {
        return this.floors;
    }

    getRooms(): RoomModel[] {
        return this.rooms;
    }

    udpateRooms(rooms) {
        this.rooms = [];
        this.rooms = rooms;
    }
}
