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
            status: 'Available',
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
            status: 'Available',
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
        // {
        //     name: '300',
        //     status: 'Available',
        //     price: 300000,
        //     type: 'Single',
        //     clients: [],
        //     floor: '3',
        //     checkinTime: new Date(),
        //     checkoutTime: new Date(),
        // },
        // {
        //     name: '301',
        //     status: 'Available',
        //     price: 3000540,
        //     type: 'Single',
        //     clients: [],
        //     floor: '3',
        //     checkinTime: new Date(),
        //     checkoutTime: new Date(),
        // },
        // {
        //     name: '302',
        //     status: 'Available',
        //     price: 340000,
        //     type: 'Single',
        //     clients: [],
        //     floor: '3',
        //     checkinTime: new Date(),
        //     checkoutTime: new Date(),
        // },
        // {
        //     name: '303',
        //     status: 'Available',
        //     price: 300000,
        //     type: 'Single',
        //     clients: [],
        //     floor: '3',
        //     checkinTime: new Date(),
        //     checkoutTime: new Date(),
        // },
        // {
        //     name: '300',
        //     status: 'Available',
        //     price: 300000,
        //     type: 'Single',
        //     clients: [],
        //     floor: '3',
        //     checkinTime: new Date(),
        //     checkoutTime: new Date(),
        // },
        // {
        //     name: '301',
        //     status: 'Available',
        //     price: 3000540,
        //     type: 'Single',
        //     clients: [],
        //     floor: '3',
        //     checkinTime: new Date(),
        //     checkoutTime: new Date(),
        // },
        // {
        //     name: '302',
        //     status: 'Available',
        //     price: 340000,
        //     type: 'Single',
        //     clients: [],
        //     floor: '3',
        //     checkinTime: new Date(),
        //     checkoutTime: new Date(),
        // },
        // {
        //     name: '303',
        //     status: 'Available',
        //     price: 300000,
        //     type: 'Single',
        //     clients: [],
        //     floor: '3',
        //     checkinTime: new Date(),
        //     checkoutTime: new Date(),
        // },
    ];
    rooms1: RoomModel[] = [];
    rooms2: RoomModel[] = [];
    rooms3: RoomModel[] = [];
    floors: FloorModel[] = [];


    constructor() {
    }

    getFloors(): FloorModel[] {
        this.floors = [];
        this.rooms1 = [];
        this.rooms2 = [];
        this.rooms3 = [];

        for (const room of this.rooms) {
            if (room.floor === '1') {
                this.rooms1.push(room);
            } else if (room.floor === '2') {
                this.rooms2.push(room);
            } else if (room.floor === '3') {
                this.rooms3.push(room);
            }
        }
        this.floors = [
            {name: '1', rooms: this.rooms1},
            {name: '2', rooms: this.rooms2},
            {name: '3', rooms: this.rooms3},
        ];
        return this.floors;
    }

    getRooms(): RoomModel[] {
        return this.rooms;
    }

    updateRooms(rooms) {
        this.rooms = [];
        this.rooms = rooms;
    }

    updateRoom(room: RoomModel) {
        const index = this.rooms.findIndex(s => s.name === room.name);
        this.rooms.splice(index, 1);
        this.rooms.splice(index, 0, room);
    }
}
