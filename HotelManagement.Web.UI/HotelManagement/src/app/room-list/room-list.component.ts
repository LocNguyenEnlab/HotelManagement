import {Component, OnInit} from '@angular/core';
import {RoomModel} from '../Model/RoomModel';
import {FloorModel} from '../Model/FloorModel';
import {ClientModel} from '../Model/ClientModel';
import {PersonalBookingDetailModel} from '../Model/PersonalBookingDetailModel';

@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
    rooms: RoomModel[] = [
        {
            name: '100',
            status: 'Available',
            price: 300000,
            type: 'Double',
            clients: [],
        },
        {
            name: '101',
            status: 'Available',
            price: 300045,
            type: 'Single',
            clients: []
        },
        {
            name: '102',
            status: 'Booking',
            price: 348000,
            type: 'Double',
            clients: []
        },
        {
            name: '200',
            status: 'Available',
            price: 400000,
            type: 'Single',
            clients: []
        },
        {
            name: '201',
            status: 'Available',
            price: 34500000,
            type: 'Single',
            clients: []
        },
        {
            name: '300',
            status: 'Available',
            price: 300000,
            type: 'Single',
            clients: []
        },
        {
            name: '301',
            status: 'Booked',
            price: 3000540,
            type: 'Single',
            clients: []
        },
        {
            name: '302',
            status: 'Available',
            price: 340000,
            type: 'Single',
            clients: []
        },
        {
            name: '303',
            status: 'Available',
            price: 300000,
            type: 'Single',
            clients: []
        },
    ];
    rooms1: RoomModel[] = [
        {
            name: '100',
            status: 'Available',
            price: 300000,
            type: 'Double',
            clients: null
        },
        {
            name: '101',
            status: 'Available',
            price: 300045,
            type: 'Single',
            clients: []
        },
        {
            name: '102',
            status: 'Booking',
            price: 348000,
            type: 'Double',
            clients: []
        },
    ];
    rooms2: RoomModel[] = [
        {
            name: '200',
            status: 'Available',
            price: 400000,
            type: 'Single',
            clients: []
        },
        {
            name: '201',
            status: 'Available',
            price: 34500000,
            type: 'Single',
            clients: []
        },
    ];
    rooms3: RoomModel[] = [
        {
            name: '300',
            status: 'Available',
            price: 300000,
            type: 'Single',
            clients: []
        },
        {
            name: '301',
            status: 'Booked',
            price: 3000540,
            type: 'Single',
            clients: []
        },
        {
            name: '302',
            status: 'Available',
            price: 340000,
            type: 'Single',
            clients: []
        },
        {
            name: '303',
            status: 'Available',
            price: 300000,
            type: 'Single',
            clients: []
        },
    ];
    floors: FloorModel[] = [
        {name: '1', rooms: this.rooms1},
        {name: '2', rooms: this.rooms2},
        {name: '3', rooms: this.rooms3},
    ];
    isVisibleBooking = false;
    Information: string;
    roomBooking: RoomModel = {
        name: '303',
        status: 'Available',
        price: 0,
        type: 'Double',
        clients: [
            {
                name: '',
                address: '',
                email: '',
                nationality: '',
                identityOrPassport: '',
                notes: '',
            }
        ]
    };
    dateNow: Date;
    client: ClientModel = {
        name: '',
        address: '',
        email: '',
        nationality: '',
        identityOrPassport: '',
        notes: '',
    };
    personalBookingDetail: PersonalBookingDetailModel = {
        roomNumber: '',
        price: '',
        checkinTime: '',
        checkoutTime: '',
        prePay: 0,
        discount: '',
        notes: '',
        clients: []
    };

    constructor() {
    }

    ngOnInit() {
        this.dateNow = new Date();
    }

    chooseRoom(id) {
        if (this.rooms.find(s => s.name === id).status === 'Available') {
            // @ts-ignore
            document.getElementById(id).style.backgroundColor = 'violet';
            this.rooms.find(s => s.name === id).status = 'BookingTemp';
        } else if (this.rooms.find(s => s.name === id).status === 'BookingTemp') {
            this.rooms.find(s => s.name === id).status = 'Available';
            // @ts-ignore
            document.getElementById(id).style.backgroundColor = 'green';
        }
    }

    inputBookingInfo(id) {
        if (this.rooms && this.rooms.length > 0) {
            const room = this.rooms.find(s => s.name === id);
            if (room) {
                if (room.status !== 'Booking' && room.status !== 'Booked') {
                    this.roomBooking = room;
                    this.Information = 'Booking Room' + id + ' (' + this.roomBooking.type + ')';
                    this.isVisibleBooking = true;
                }
            }
        }
    }

    addClientInfo() {
        const clientTemp: ClientModel = Object.assign({}, this.client);
        this.roomBooking.clients.push(clientTemp);
        this.resetClientInput();
        this.personalBookingDetail.clients.push(clientTemp);
    }

    resetClientInput() {
        this.client = {
            name: '',
            address: '',
            email: '',
            nationality: '',
            identityOrPassport: '',
            notes: '',
        };
    }

    bookPersonalRoom() {

    }

    cancelBooking() {

    }
}
