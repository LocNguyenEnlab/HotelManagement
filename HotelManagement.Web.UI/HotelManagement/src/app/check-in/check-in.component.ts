import {Component, OnInit} from '@angular/core';
import {RoomModel} from '../models/RoomModel';
import {PersonalBookingDetailModel} from '../models/PersonalBookingDetailModel';
import {ClientModel} from '../models/ClientModel';
import {BookedClientsListModel} from '../models/BookedClientsListModel';
import {BookedClientsListService} from '../services/booked-clients-list.service';
import notify from 'devextreme/ui/notify';
import {RoomService} from '../services/room.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-check-in',
    templateUrl: './check-in.component.html',
    styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {
    static isVisiblePersonalCheckinPopup = false;
    titlePersonalCheckin: string;
    roomBooking: RoomModel = {
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
        room: this.roomBooking,
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

    constructor(
        private bookedClientsListService: BookedClientsListService,
        private roomService: RoomService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.rooms = this.roomService.getRooms();
    }

    onInit(roomBooking: RoomModel) {
        this.roomBooking = roomBooking;
        this.titlePersonalCheckin = 'Personal checkin for room ' + this.roomBooking.name;
    }

    get staticIsVisiblePersonalCheckinPopup() {
        return CheckInComponent.isVisiblePersonalCheckinPopup;
    }

    cancel() {
        CheckInComponent.isVisiblePersonalCheckinPopup = false;
    }

    addBookedClientsList(clients: ClientModel[], checkinTime: Date, checkoutTime: Date, bookType, code, prePay, roomName) {
        for (const client of clients) {
            const bookedClient: BookedClientsListModel = {
                contactName: client.name,
                checkinTime,
                checkoutTime,
                code,
                bookType,
                prePay,
                notes: client.notes,
                createdTime: new Date(),
                roomName,
                type: 'Checkin'
            };
            this.bookedClientsListService.saveBookedClientsList(bookedClient);
        }
    }

    checkinForPersonal() {
        this.addBookedClientsList(this.personalBookingDetail.clients, this.roomBooking.checkinTime, this.roomBooking.checkoutTime,
            'Personal Booking', '000', this.personalBookingDetail.prePay, this.roomBooking.name);
        notify('Checkin successfully', 'success');
        CheckInComponent.isVisiblePersonalCheckinPopup = false;
        this.updateRoomsStatus();
        this.router.navigate(['/']);
    }

    updateRoomsStatus() {
        const bookedList = this.bookedClientsListService.getBookedClientsList();
        for (const bookedClient of bookedList) {
            if (bookedClient.type === 'Checkin') {
                // for (const roomName of bookedClient.roomName) {
                //
                // }
                if (this.rooms.find(s => s.name === '100')) {
                    this.rooms.find(s => s.name === '100').status = 'Booked';
                }
            }
        }
    }

    addClientInfo() {
        if ((this.roomBooking.type === 'Single' && this.roomBooking.clients.length === 0) || this.roomBooking.type === 'Double') {
            const clientTemp: ClientModel = Object.assign({}, this.client);
            this.roomBooking.clients.push(clientTemp);
            // this.resetClientInput();
            this.personalBookingDetail.clients.push(clientTemp);
        } else {
            notify('Can not add more than one client for Single room!', 'warning');
        }
    }
}
