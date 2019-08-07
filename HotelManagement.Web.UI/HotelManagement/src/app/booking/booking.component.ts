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
    clientsListBooking: ClientModel[] = [];
    roomBooking: RoomModel = new RoomModel();
    rooms: RoomModel[] = [];
    bookingTitle: string;
    discount: number;
    prepay: number;

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
            this.roomBooking.checkoutTime.setDate(this.roomBooking.checkinTime.getDate() + 1);
            this.roomBooking.checkoutTime.setHours(12, 0, 0, 0);
            if (new Date().getHours() < 14) {
                this.roomBooking.checkinTime.setHours(14, 0, 0, 0);
            }
            this.roomBooking.clients = [];
            this.bookingTitle = 'Booking room ' + roomBooking.name + ' (' + roomBooking.type + ')';
        }
    }

    cancelBooking() {
        this.roomBooking = new RoomModel();
        this.clientsListBooking = [];
        this.isVisiblePersonalBookingPopup = false;
    }

    async bookPersonalRoom() {
        if (this.roomBooking.clients.length) {
            if (this.roomBooking.type === 'Single' && this.roomBooking.clients.length < 2 || this.roomBooking.type === 'Double') {
                const code = Math.floor(Math.random() * 9999);
                notify('Code: ' + code, 'success');
                if (!this.prepay) {
                    this.prepay = 0;
                }
                if (!this.discount) {
                    this.discount = 0;
                }
                for (const client of this.roomBooking.clients) {
                    client.code = code;
                    client.checkinTime = this.roomBooking.checkinTime;
                    client.checkoutTime = this.roomBooking.checkoutTime;
                    client.status = 'Booked';
                    client.bookType = 'Personal Booking';
                    client.prepay = this.prepay;
                    client.discount = this.discount;
                }
                this.isVisiblePersonalBookingPopup = false;
                this.roomBooking.status = 'Booking';
                await this.roomService.updateRoom(this.roomBooking).toPromise().then();
                // window.location.reload();
            } else {
                notify('Can not booking because there are more than 1 client for single room!', 'error');
            }
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
}
