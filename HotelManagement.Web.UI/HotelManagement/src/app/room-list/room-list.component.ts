import {Component, OnInit, ViewChild} from '@angular/core';
import {RoomModel} from '../models/RoomModel';
import {FloorModel} from '../models/FloorModel';
import {ClientModel} from '../models/ClientModel';
import {PersonalBookingDetailModel} from '../models/PersonalBookingDetailModel';
import {BookingService} from '../services/booking.service';
import notify from 'devextreme/ui/notify';
import {RoomService} from '../services/room.service';
import {GroupBookingDetailModel} from '../models/GroupBookingDetailModel';
import {ClientService} from '../services/client.service';
import {BookedClientsListModel} from '../models/BookedClientsListModel';
import {BookedClientsListService} from '../services/booked-clients-list.service';
import {CheckInComponent} from '../check-in/check-in.component';
import {__assign} from 'tslib';

@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
    @ViewChild(CheckInComponent, {static: false}) checkinComponent;
    floors: FloorModel[] = [];
    rooms: RoomModel[] = [];
    isVisiblePersonalBookingPopup = false;
    isVisibleGroupBookingPopup = false;
    dataRightClick = [];
    availableAndBookedRoomsName: string[] = [];
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
        name: 'test',
        address: 'test',
        email: 'test@test.test',
        nationality: 'test',
        identityOrPassport: 'test',
        notes: 'test',
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
        private bookedClientsListService: BookedClientsListService,
    ) {
    }

    ngOnInit() {
        this.dateNow = new Date();
        this.rooms = [];
        this.floors = [];
        this.rooms = this.roomService.getRooms();
        this.floors = this.roomService.getFloors();
        this.getAvailableRoomsName();
        this.dataRightClick = [
            {text: 'Checkin'},
            {text: 'Checkout'},
        ];
    }

    getAvailableRoomsName() {
        this.availableAndBookedRoomsName = [];
        for (const room of this.rooms) {
            if (room.status === 'Available' || room.status === 'Booked') {
                this.availableAndBookedRoomsName.push(room.name);
            }
        }
    }

    chooseRoom(id) {
        const name = id.toString().replace('R', '');
        if (this.rooms.find(s => s.name === name).status === 'Available') {
            this.rooms.find(s => s.name === name).status = 'Selected';
        } else if (this.rooms.find(s => s.name === name).status === 'Selected') {
            this.rooms.find(s => s.name === name).status = 'Available';
        }
    }

    inputBookingInfo(id) {
        const name = id.toString().replace('R', '');
        if (this.rooms && this.rooms.length > 0) {
            const room = this.rooms.find(s => s.name === name);
            if (room) {
                if (room.status !== 'Booking' && room.status !== 'Booked') {
                    Object.assign(this.roomBooking, room);
                    this.bookingTitle = 'Booking Room' + name + ' (' + this.roomBooking.type + ')';
                    this.isVisiblePersonalBookingPopup = true;
                }
            }
        }
    }

    addClientInfoOfPersonalBooking() {
        if ((this.roomBooking.type === 'Single' && this.roomBooking.clients.length === 0) || this.roomBooking.type === 'Double') {
            const clientTemp: ClientModel = Object.assign({}, this.client);
            this.roomBooking.clients.push(clientTemp);
            // this.resetClientInput();
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
            const code = Math.floor(Math.random() * 1000);
            notify('Code: ' + code, 'success');
            this.bookingService.saveClients(this.personalBookingDetail.clients);
            this.isVisiblePersonalBookingPopup = false;
            this.rooms.find(s => s.name === this.roomBooking.name).status = 'Booking';
            for (const floor of this.floors) {
                if (floor.rooms.find(s => s.name === this.roomBooking.name)) {
                    floor.rooms.find(s => s.name === this.roomBooking.name).status = 'Booking';
                    floor.rooms.find(s => s.name === this.roomBooking.name).checkinTime = this.personalBookingDetail.room.checkinTime;
                    floor.rooms.find(s => s.name === this.roomBooking.name).checkoutTime = this.personalBookingDetail.room.checkoutTime;
                }
            }
            const rooms: RoomModel[] = [];
            rooms.push(this.roomBooking);
            this.personalBookingDetail.room = this.roomBooking;
            this.clientService.saveBookedClients(this.personalBookingDetail.clients);
            this.addBookedClientsList(this.personalBookingDetail.clients, this.roomBooking.checkinTime, this.roomBooking.checkoutTime,
                'Personal Booking', code.toString(), this.personalBookingDetail.prePay, rooms, this.personalBookingDetail.discount);
            this.getAvailableRoomsName();
            this.personalBookingDetail.clients = [];
        } else {
            notify('Please add client for this room!', 'error');
        }
    }

    cancelBooking() {
        this.roomBooking = {
            name: '',
            status: '',
            price: 0,
            type: '',
            clients: null,
            floor: null,
            checkinTime: new Date(),
            checkoutTime: new Date(),
        };
        this.personalBookingDetail = {
            room: this.roomBooking,
            prePay: 0,
            discount: 0,
            notes: '',
            clients: []
        };
        this.isVisiblePersonalBookingPopup = false;
    }

    groupBooking() {
        for (const room of this.rooms) {
            if (room.status === 'Selected') {
                this.roomsBooking.push(room);
            }
        }
        if (this.roomsBooking.length < 2) {
            notify('Please select at least 2 rooms for group booking!', 'error', 2000);
            this.roomsBooking = [];
        } else {
            this.isVisibleGroupBookingPopup = true;
        }
    }

    cancelGroupBooking() {
        this.roomsBooking = [];
        this.groupBookingDetail = {
            checkinTime: new Date(),
            checkoutTime: new Date(),
            prePay: 0,
            discount: 0,
            notes: '',
            clients: [],
            rooms: []
        };
        this.isVisibleGroupBookingPopup = false;
    }

    bookGroupRooms() {
        if (this.groupBookingDetail.clients.length > 0) {
            const code = Math.floor(Math.random() * 1000);
            notify('Code: ' + code, 'success');
            for (const roomBooking of this.roomsBooking) {
                this.rooms.find(s => s.name === roomBooking.name).status = 'Booking';
                for (const floor of this.floors) {
                    if (floor.rooms.find(s => s.name === roomBooking.name)) {
                        floor.rooms.find(s => s.name === roomBooking.name).status = 'Booking';
                        floor.rooms.find(s => s.name === roomBooking.name).checkinTime = this.groupBookingDetail.checkinTime;
                        floor.rooms.find(s => s.name === roomBooking.name).checkoutTime = this.groupBookingDetail.checkoutTime;
                    }
                }
            }
            this.isVisibleGroupBookingPopup = false;
            this.groupBookingDetail.rooms = this.roomsBooking;
            this.clientService.saveBookedClients(this.groupBookingDetail.clients);
            this.addBookedClientsList(this.groupBookingDetail.clients, this.groupBookingDetail.checkinTime, this.groupBookingDetail.checkoutTime,
                'Group Booking', code.toString(), this.groupBookingDetail.prePay, this.roomsBooking, this.groupBookingDetail.discount);
            this.roomsBooking = [];
            this.getAvailableRoomsName();
            this.groupBookingDetail.clients = [];
        } else {
            notify('Please add client for this rooms!', 'error');
        }
    }

    addClientInfoOfGroupBooking() {
        const clientTemp: ClientModel = Object.assign({}, this.client);
        this.groupBookingDetail.clients.push(clientTemp);
        // this.resetClientInput();
    }

    addBookedClientsList(clients: ClientModel[], checkinTime: Date, checkoutTime: Date, bookType, code, prePay, rooms, discount) {
        for (const client of clients) {
            const bookedClient: BookedClientsListModel = {
                id: null,
                client,
                checkinTime,
                checkoutTime,
                code,
                bookType,
                prePay,
                notes: client.notes,
                createdTime: new Date(),
                rooms,
                type: 'Booking',
                discount
            };
            this.bookedClientsListService.addBookedClientList(bookedClient);
        }
    }

    rightClick(e, name) {
        const room = this.rooms.find(s => s.name === name.replace('R', ''));
        if (e.itemData.text === 'Checkin' && room.status === 'Available') {
            CheckInComponent.isVisiblePersonalCheckinPopup = true;
            this.checkinComponent.onInit(Object.assign({}, room),
                null, null);
        } else if (e.itemData.text === 'Checkout' && room.status === 'Booked') {
            notify('Checkout');
        }
    }

    groupCheckin() {
        const roomsCheckin: RoomModel[] = [];
        for (const room of this.rooms) {
            if (room.status === 'Selected') {
                roomsCheckin.push(room);
            }
        }
        if (roomsCheckin.length < 2) {
            notify('Please select at least 2 rooms for group checkin!', 'error', 2000);
        } else {
            CheckInComponent.isVisibleGroupCheckinPopup = true;
            this.checkinComponent.onInit(null, roomsCheckin, null);
        }
    }
}
