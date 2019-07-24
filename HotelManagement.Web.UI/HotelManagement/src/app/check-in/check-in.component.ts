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

    constructor(
        private bookedClientsListService: BookedClientsListService,
        private roomService: RoomService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.rooms = this.roomService.getRooms();
    }

    onInit(roomCheckin: RoomModel, roomsCheckin: RoomModel[], personalBookingDetail: PersonalBookingDetailModel, groupBookingDetail: GroupBookingDetailModel) {
        if (roomCheckin != null) {
             this.roomCheckin = roomCheckin;
        }
        if (roomsCheckin != null) {
            this.roomsCheckin = roomsCheckin;
        }
        if (personalBookingDetail != null) {
            this.personalBookingDetail = personalBookingDetail;
        }
        if (groupBookingDetail != null) {
            this.groupBookingDetail = groupBookingDetail;
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
                type: 'Checkin',
                discount
            };
            this.bookedClientsListService.saveBookedClientsList(bookedClient);
        }
    }

    checkinForPersonal() {
        this.addBookedClientsList(this.personalBookingDetail.clients, this.roomCheckin.checkinTime, this.roomCheckin.checkoutTime,
            'Personal Booking', '-1', this.personalBookingDetail.prePay, this.roomCheckin, this.personalBookingDetail.discount);
        notify('Checkin successfully', 'success');
        this.updateRooms(Object.assign(this.personalBookingDetail.clients));
        this.router.navigate(['/booked-clients-list']);
        CheckInComponent.isVisiblePersonalCheckinPopup = false;
    }

    updateRooms(clients) {
        if (CheckInComponent.isVisiblePersonalCheckinPopup) {
            const roomName = this.roomCheckin.name;
            this.rooms.find(s => s.name === roomName).status = 'Booked';
            this.rooms.find(s => s.name === roomName).clients = clients;
        } else if (CheckInComponent.isVisibleGroupCheckinPopup) {
            for (const room of this.roomsCheckin) {
                if (this.rooms.find(s => s.name === room.name)) {
                    this.rooms.find(s => s.name === room.name).status = 'Booked';
                    this.rooms.find(s => s.name === room.name).clients = clients;
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
        this.addBookedClientsList(this.groupBookingDetail.clients, this.groupBookingDetail.checkinTime, this.groupBookingDetail.checkoutTime,
            'Group Booking', '-1', this.groupBookingDetail.prePay, this.roomsCheckin, this.groupBookingDetail.discount);
        notify('Checkin successfully', 'success');
        this.updateRooms(this.groupBookingDetail.clients);
        this.router.navigate(['/booked-clients-list']);
        CheckInComponent.isVisibleGroupCheckinPopup = false;
    }

    cancelGroupCheckin() {
        CheckInComponent.isVisibleGroupCheckinPopup = false;
    }
}
