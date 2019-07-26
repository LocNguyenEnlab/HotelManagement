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
import {BookingComponent} from '../booking/booking.component';

@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
    @ViewChild(CheckInComponent, {static: false}) checkinComponent;
    @ViewChild(BookingComponent, {static: false}) bookingComponent;
    floors: FloorModel[] = [];
    rooms: RoomModel[] = [];
    checkInCheckOutText = [];
    availableAndBookedRoomsName: string[] = [];
    bookingRoomsName: string[] = [];
    updateBookingText = [];

    constructor(
        private bookingService: BookingService,
        private roomService: RoomService,
    ) {
    }

    ngOnInit() {
        this.rooms = [];
        this.floors = [];
        this.rooms = this.roomService.getRooms();
        this.floors = this.roomService.getFloors();
        this.getRoomsName();
        this.checkInCheckOutText = [
            {text: 'Checkin'},
            {text: 'Checkout'},
        ];
        this.updateBookingText = [
            {text: 'Update booking'},
        ];
    }

    getRoomsName() {
        this.availableAndBookedRoomsName = [];
        for (const room of this.rooms) {
            if (room.status === 'Available' || room.status === 'Booked') {
                this.availableAndBookedRoomsName.push(room.name);
            }
            if (room.status === 'Booking') {
                this.bookingRoomsName.push(room.name);
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

    openPopupPersonalBooking(id) {
        const name = id.toString().replace('R', '');
        const roomBooking = this.rooms.find(s => s.name === name);
        if (roomBooking.status !== 'Booking' && roomBooking.status !== 'Booked'){
            BookingComponent.isVisiblePersonalBookingPopup = true;
            this.bookingComponent.onInit(roomBooking, null, null);
        }
    }

    openPopupGroupBooking() {
        const roomsBooking: RoomModel[] = [];
        for (const room of this.rooms) {
            if (room.status === 'Selected') {
                roomsBooking.push(room);
            }
        }
        if (roomsBooking.length < 2) {
            notify('Please select at least 2 rooms for group booking!', 'error', 2000);
        } else {
            BookingComponent.isVisibleGroupBookingPopup = true;
            this.bookingComponent.onInit(null, roomsBooking, null);
        }
    }

    checkInCheckOut(e, name) {
        const room = this.rooms.find(s => s.name === name.replace('R', ''));
        if (e.itemData.text === 'Checkin' && room.status === 'Available') {
            CheckInComponent.isVisiblePersonalCheckinPopup = true;
            this.checkinComponent.onInit(Object.assign({}, room), null, null);
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

    updateBooking(e, name) {
        BookingComponent.isVisiblePersonalBookingPopup = true;
        this.bookingComponent.onInit(this.rooms.find(s => s.name === name), null, null);
    }
}
