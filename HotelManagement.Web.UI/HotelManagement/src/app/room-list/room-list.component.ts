import {Component, OnInit} from '@angular/core';
import {RoomModel} from '../models/RoomModel';
import {FloorModel} from '../models/FloorModel';
import {ClientModel} from '../models/ClientModel';
import {PersonalBookingDetailModel} from '../models/PersonalBookingDetailModel';
import {BookingService} from '../services/booking.service';
import notify from 'devextreme/ui/notify';
import {RoomService} from '../services/room.service';
import {GroupBookingDetailModel} from '../models/GroupBookingDetailModel';
import {ClientService} from '../services/client.service';

@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
    floors: FloorModel[] = [];
    rooms: RoomModel[] = [];

    isVisiblePersonalBookingPopup = false;
    isVisibleGroupBookingPopup = false;
    bookingTitle: string;
    roomBooking: RoomModel = {
        name: '',
        status: '',
        price: 0,
        type: '',
        clients: null,
        floor: null,
        checkinTime: new Date(),
        checkoutTime: new Date(),
    };
    roomsBooking: RoomModel[] = [];
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
        room: this.roomBooking,
        prePay: 0,
        discount: 0,
        notes: '',
        clients: []
    };
    groupBookingDetail: GroupBookingDetailModel = {
        checkinTime: new Date(),
        checkoutTime: new Date(),
        prePay: 0,
        discount: 0,
        notes: '',
        clients: [],
        rooms: []
    };

    constructor(
        private bookingService: BookingService,
        private roomService: RoomService,
        private clientService: ClientService,
    ) {
    }

    ngOnInit() {
        this.dateNow = new Date();
        this.rooms = this.roomService.getRooms();
        this.floors = this.roomService.getFloors();
    }

    chooseRoom(id) {
        if (this.rooms.find(s => s.name === id).status === 'Available') {
            // @ts-ignore
            document.getElementById(id).style.backgroundColor = 'violet';
            this.rooms.find(s => s.name === id).status = 'Selected';
        } else if (this.rooms.find(s => s.name === id).status === 'Selected') {
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
                    this.bookingTitle = 'Booking Room' + id + ' (' + this.roomBooking.type + ')';
                    this.isVisiblePersonalBookingPopup = true;
                }
            }
        }
    }

    addClientInfo() {
        if ((this.roomBooking.type === 'Single' && this.roomBooking.clients.length === 0) || this.roomBooking.type === 'Double') {
            const clientTemp: ClientModel = Object.assign({}, this.client);
            this.roomBooking.clients.push(clientTemp);
            this.resetClientInput();
            this.personalBookingDetail.clients.push(clientTemp);
        } else {
            notify('Can not add more than one client for Single room!', 'warning');
        }
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
        if (this.personalBookingDetail.clients.length > 0) {
            notify('Booking successfully!', 'success');
            this.bookingService.saveClients(this.personalBookingDetail.clients);
            this.isVisiblePersonalBookingPopup = false;
            this.roomBooking.status = 'Booking';
            for (const floor of this.floors) {
                if (floor.rooms.find(s => s.name === this.roomBooking.name)) {
                    floor.rooms.find(s => s.name === this.roomBooking.name).status = 'Booking';
                }
            }
            this.personalBookingDetail.room = this.roomBooking;
            this.clientService.saveBookedClients(this.personalBookingDetail.clients);
        } else {
            notify('Please add client for this room!', 'error');
        }
    }

    cancelBooking() {
        this.isVisiblePersonalBookingPopup = false;
    }

    groupBooking() {
        for (const room of this.rooms) {
            if (room.status === 'Selected') {
                this.roomsBooking.push(room);
            }
        }
        if (this.roomsBooking.length < 2) {
            alert('Please select at least 2 rooms for group booking!');
            this.roomsBooking = [];
        } else {
            this.isVisibleGroupBookingPopup = true;
        }
    }

    cancelGroupBooking() {
        this.roomsBooking = [];
        this.isVisibleGroupBookingPopup = false;
    }

    bookGroupRooms() {
        if (this.groupBookingDetail.clients.length > 0) {
            notify('Group Booking successfully!', 'success');
            for (const roomBooking of this.roomsBooking) {
                for (const floor of this.floors) {
                    if (floor.rooms.find(s => s.name === roomBooking.name)) {
                        floor.rooms.find(s => s.name === roomBooking.name).status = 'Booking';
                    }
                }
            }
            this.roomsBooking = [];
            this.isVisibleGroupBookingPopup = false;
            this.groupBookingDetail.rooms = this.roomsBooking;
            this.clientService.saveBookedClients(this.groupBookingDetail.clients);
        } else {
            notify('Please add client for this rooms!', 'error');
        }
    }

    addClientInfoOfGroupBooking() {
        const clientTemp: ClientModel = Object.assign({}, this.client);
        this.groupBookingDetail.clients.push(clientTemp);
        this.resetClientInput();
    }
}
