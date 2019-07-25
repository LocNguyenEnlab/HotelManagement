import {Component, OnInit} from '@angular/core';
import {RoomModel} from '../models/RoomModel';
import {PersonalBookingDetailModel} from '../models/PersonalBookingDetailModel';
import {ClientModel} from '../models/ClientModel';
import {BookedClientsListModel} from '../models/BookedClientsListModel';
import {BookedClientsListService} from '../services/booked-clients-list.service';
import notify from 'devextreme/ui/notify';
import {RoomService} from '../services/room.service';
import {Router} from '@angular/router';
import {GroupBookingDetailModel} from '../models/GroupBookingDetailModel';

@Component({
    selector: 'app-check-in',
    templateUrl: './check-in.component.html',
    styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {
    static isVisiblePersonalCheckinPopup = false;
    static isVisibleGroupCheckinPopup = false;
    titlePersonalCheckin: string;
    roomCheckin: RoomModel = {
        name: '',
        status: '',
        price: 0,
        type: '',
        checkinTime: new Date(),
        checkoutTime: new Date(),
        clients: [],
        floor: '',
    };
    personalBookingDetail: PersonalBookingDetailModel = {
        room: this.roomCheckin,
        prePay: 0,
        discount: 0,
        notes: '',
        clients: [],
    };
    client: ClientModel = {
        name: 'x',
        address: 'x',
        email: 'A@A.A',
        identityOrPassport: 'x',
        nationality: 'x',
        notes: 'x',
    };
    rooms: RoomModel[] = [];
    groupBookingDetail: GroupBookingDetailModel = {
        checkinTime: new Date(),
        checkoutTime: new Date(),
        prePay: 0,
        discount: 0,
        notes: '',
        clients: [],
        rooms: []
    };
    roomsCheckin: RoomModel[] = [];
    bookedClientCheckin: BookedClientsListModel;

    constructor(
        private bookedClientsListService: BookedClientsListService,
        private roomService: RoomService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.rooms = this.roomService.getRooms();
    }

    onInit(roomCheckin: RoomModel, roomsCheckin: RoomModel[], bookedClientCheckin: BookedClientsListModel) {
        if (roomCheckin != null) {
             this.roomCheckin = roomCheckin;
        }
        if (roomsCheckin != null) {
            this.roomsCheckin = roomsCheckin;
        }
        if (bookedClientCheckin != null && bookedClientCheckin.bookType === 'Personal Booking') {
            this.personalBookingDetail = {
                room: bookedClientCheckin.rooms[0],
                prePay: bookedClientCheckin.prePay,
                discount: bookedClientCheckin.discount,
                notes: bookedClientCheckin.notes,
                clients: [bookedClientCheckin.client],
            };
            this.bookedClientCheckin = bookedClientCheckin;
            this.client = Object.assign({}, this.personalBookingDetail.clients[0]);
            this.roomCheckin = this.personalBookingDetail.room;
        }
        if (bookedClientCheckin != null && bookedClientCheckin.bookType === 'Group Booking') {
            this.groupBookingDetail = {
                checkinTime: bookedClientCheckin.checkoutTime,
                checkoutTime: bookedClientCheckin.checkoutTime,
                prePay: bookedClientCheckin.prePay,
                discount: bookedClientCheckin.discount,
                notes: bookedClientCheckin.notes,
                clients: [bookedClientCheckin.client],
                rooms: bookedClientCheckin.rooms,
            };
            this.bookedClientCheckin = bookedClientCheckin;
            this.client = Object.assign({}, this.groupBookingDetail.clients[0]);
            this.roomsCheckin = this.groupBookingDetail.rooms;
        }
        this.titlePersonalCheckin = 'Personal checkin for room ' + this.roomCheckin.name;
    }

    get staticIsVisiblePersonalCheckinPopup() {
        return CheckInComponent.isVisiblePersonalCheckinPopup;
    }

    get staticIsVisibleGroupCheckinPopup() {
        return CheckInComponent.isVisibleGroupCheckinPopup;
    }

    cancel() {
        CheckInComponent.isVisiblePersonalCheckinPopup = false;
    }

    addBookedClientsList(id: number = null, clients: ClientModel[], checkinTime: Date, checkoutTime: Date, bookType, code, prePay, rooms, discount) {
        for (const client of clients) {
            const bookedClient: BookedClientsListModel = {
                id,
                client,
                checkinTime,
                checkoutTime,
                code,
                bookType,
                prePay,
                notes: client.notes,
                createdTime: new Date(),
                rooms,
                type: 'Checkin',
                discount
            };
            if (id != null) {
                this.bookedClientsListService.updateBookedClientList(bookedClient);
            } else {
                this.bookedClientsListService.addBookedClientList(bookedClient);
            }
        }
    }

    checkinForPersonal() {
        this.updateRooms(this.personalBookingDetail.clients);
        const rooms: RoomModel[] = [];
        rooms.push(this.roomCheckin);
        if (this.bookedClientCheckin) { // add new
            this.addBookedClientsList(this.bookedClientCheckin.id, this.personalBookingDetail.clients, this.personalBookingDetail.room.checkinTime,
                this.personalBookingDetail.room.checkoutTime, 'Personal Booking', '-1', this.personalBookingDetail.prePay, rooms,
                this.personalBookingDetail.discount);
        } else { // update exists
            this.addBookedClientsList(null, this.personalBookingDetail.clients, this.personalBookingDetail.room.checkinTime,
                this.personalBookingDetail.room.checkoutTime, 'Personal Booking', '-1',
                this.personalBookingDetail.prePay, rooms, this.personalBookingDetail.discount);
        }
        notify('Checkin successfully', 'success');
        this.router.navigate(['/booked-clients-list']);
        CheckInComponent.isVisiblePersonalCheckinPopup = false;
    }

    updateRooms(clients) {
        if (CheckInComponent.isVisiblePersonalCheckinPopup) {
            const roomName = this.roomCheckin.name;
            if (this.rooms.find(s => s.name === roomName)) {
                this.rooms.find(s => s.name === roomName).status = 'Booked';
                for (const client of clients) {
                    // this.rooms.find(s => s.name === roomName).clients.push(client);
                    this.rooms.find(s => s.name === roomName).checkinTime = this.personalBookingDetail.room.checkinTime;
                    this.rooms.find(s => s.name === roomName).checkoutTime = this.personalBookingDetail.room.checkoutTime;
                }
            }
        } else if (CheckInComponent.isVisibleGroupCheckinPopup) {
            for (const room of this.roomsCheckin) {
                if (this.rooms.find(s => s.name === room.name)) {
                    this.rooms.find(s => s.name === room.name).status = 'Booked';
                    for (const client of clients) {
                        this.rooms.find(s => s.name === room.name).clients.push(client);
                        this.rooms.find(s => s.name === room.name).checkinTime = this.groupBookingDetail.checkinTime;
                        this.rooms.find(s => s.name === room.name).checkoutTime = this.groupBookingDetail.checkoutTime;
                    }
                }
            }
        }
        this.roomService.updateRooms(this.rooms);
    }

    addClientInfoOfPersonalBooking() {
        if ((this.roomCheckin.type === 'Single' && this.roomCheckin.clients.length === 0) || this.roomCheckin.type === 'Double') {
            const clientTemp: ClientModel = Object.assign({}, this.client);
            this.roomCheckin.clients.push(clientTemp);
            // this.resetClientInput();
            this.personalBookingDetail.clients.push(clientTemp);
        } else {
            notify('Can not add more than one client for Single room!', 'warning');
        }
    }

    addClientInfoOfGroupBooking() {
        const clientTemp: ClientModel = Object.assign({}, this.client);
        this.groupBookingDetail.clients.push(clientTemp);
        // this.resetClientInput();
    }

    checkinForGroup() {
        if (this.bookedClientCheckin) {
            this.addBookedClientsList(this.bookedClientCheckin.id, this.groupBookingDetail.clients, this.groupBookingDetail.checkinTime,
                this.groupBookingDetail.checkoutTime, 'Group Booking', '-1', this.groupBookingDetail.prePay, this.roomsCheckin,
                this.groupBookingDetail.discount);
        } else {
            this.addBookedClientsList(null, this.groupBookingDetail.clients, this.groupBookingDetail.checkinTime,
                this.groupBookingDetail.checkoutTime, 'Group Booking', '-1', this.groupBookingDetail.prePay,
                this.roomsCheckin, this.groupBookingDetail.discount);
        }
        notify('Checkin successfully', 'success');
        this.updateRooms(this.groupBookingDetail.clients);
        this.router.navigate(['/booked-clients-list']);
        CheckInComponent.isVisibleGroupCheckinPopup = false;
    }

    cancelGroupCheckin() {
        CheckInComponent.isVisibleGroupCheckinPopup = false;
    }
}
