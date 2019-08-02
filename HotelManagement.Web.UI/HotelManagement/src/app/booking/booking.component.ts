import {Component, OnInit} from '@angular/core';
import {PersonalBookingDetailModel} from '../models/PersonalBookingDetailModel';
import {GroupBookingDetailModel} from '../models/GroupBookingDetailModel';
import {ClientModel} from '../models/ClientModel';
import {RoomModel} from '../models/RoomModel';
import notify from 'devextreme/ui/notify';
import {ClientService} from '../services/client.service';
import {RoomService} from '../services/room.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
    isVisibleGroupBookingPopup = false;
    isVisiblePersonalBookingPopup = false;
    updateBooking = false;
    clientBooking: ClientModel = new ClientModel();
    clientsListBooking: ClientModel[] = [];
    roomBooking: RoomModel = new RoomModel();
    roomsBooking: RoomModel[] = [];
    rooms: RoomModel[] = [];
    bookingTitle: string;

    constructor(
        private clientService: ClientService,
        private roomService: RoomService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.rooms = [];
        this.roomService.getRooms().subscribe(data => {
            this.rooms = data;
        });
    }

    onInit(roomBooking: RoomModel) {
        if (roomBooking) {
            this.roomBooking = roomBooking;
            this.roomBooking.checkinTime = new Date();
            this.roomBooking.checkoutTime = new Date();
            this.roomBooking.clients = [];
            this.bookingTitle = 'Booking room ' + roomBooking.name + ' (' + roomBooking.type + ')';
        }
    }

    addClientInfoOfGroupBooking() {
        const clientTemp: ClientModel = Object.assign({}, this.clientBooking);
        this.clientsListBooking.push(clientTemp);
        // this.resetClientInput();
    }

    bookGroupRooms() {
        // if (this.groupBookingDetail.clients.length > 0) {
        //     const code = Math.floor(Math.random() * 1000);
        //     notify('Code: ' + code, 'success');
        //     for (const roomBooking of this.roomsBooking) {
        //         roomBooking.status = 'Booking';
        //         roomBooking.clients = this.groupBookingDetail.clients;
        //         this.updateRoom(roomBooking);
        //     }
        //     this.isVisibleGroupBookingPopup = false;
        //     this.groupBookingDetail.rooms = this.roomsBooking;
        //     this.clientService.saveBookedClients(this.groupBookingDetail.clients);
        //     this.addBookedClientsList(null, this.groupBookingDetail.clients, this.groupBookingDetail.checkinTime,
        //         this.groupBookingDetail.checkoutTime, 'Group Booking', code.toString(), this.groupBookingDetail.prePay,
        //         this.roomsBooking, this.groupBookingDetail.discount);
        //     this.roomsBooking = [];
        //     this.groupBookingDetail.clients = [];
        //     this.router.navigate(['/booked-clients-list']);
        // } else {
        //     notify('Please add client for this rooms!', 'error');
        // }
    }

    cancelGroupBooking() {
        this.roomsBooking = [];
        this.clientsListBooking = [];
        this.clientBooking = new ClientModel();
        this.isVisibleGroupBookingPopup = false;
    }

    cancelBooking() {
        this.roomBooking = new RoomModel();
        this.clientsListBooking = [];
        this.clientBooking = new ClientModel();
        this.isVisiblePersonalBookingPopup = false;
    }

    addClientInfoOfPersonalBooking() {
        this.clientBooking.status = 'Booking';
        this.clientBooking.bookType = 'Personal Booking';
        this.clientBooking.checkinTime = this.roomBooking.checkinTime;
        this.clientBooking.checkoutTime = this.roomBooking.checkoutTime;
        if ((this.roomBooking.type === 'Single' && this.roomBooking.clients.length < 2)) {
            const clientTemp: ClientModel = Object.assign({}, this.clientBooking);
            this.roomBooking.clients.push(clientTemp);
            // this.resetClientInput();
            // this.personalBookingDetail.clients.push(clientTemp);
        } else if (this.roomBooking.type === 'Double') {
            const clientTemp: ClientModel = Object.assign({}, this.clientBooking);
            this.roomBooking.clients.push(clientTemp);
        } else {
            notify('Can not add more than one client for Single room!', 'warning');
        }
    }

    resetClientInput() {
        // this.clientBooking = {
        //     id: null,
        //     name: '',
        //     address: '',
        //     email: '',
        //     nationality: '',
        //     identityOrPassport: '',
        //     notes: '',
        //     roomName: '',
        //     invoiceId: 0
        // };
    }

    async bookPersonalRoom() {
        if (this.roomBooking.clients) {
            const code = Math.floor(Math.random() * 9999);
            notify('Code: ' + code, 'success');
            for (const client of this.roomBooking.clients) {
                client.code = code;
            }
            // this.bookingService.saveClients(this.personalBookingDetail.clients);
            this.isVisiblePersonalBookingPopup = false;
            this.roomBooking.status = 'Booking';
            // for (const client of this.roomBooking.clients) {
            //     await this.clientService.addClient(client).toPromise().then();
            // }
            await this.roomService.updateRoom(this.roomBooking).toPromise().then();
            this.router.navigate(['/booked-clients-list']);
        } else {
            notify('Please add client for this room!', 'error');
        }
    }

    updatePersonalBooking() {
        // this.updateRoom(this.roomBooking);
        // const rooms: RoomModel[] = [];
        // rooms.push(this.roomBooking);
        // notify('Update personal booking successfully!', 'success');
        // this.isVisiblePersonalBookingPopup = false;
    }

    updateGroupBooking() {
        notify('update group');
        this.isVisibleGroupBookingPopup = false;
    }
}
