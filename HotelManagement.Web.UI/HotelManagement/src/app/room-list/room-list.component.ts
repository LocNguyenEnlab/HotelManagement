import {Component, OnInit, ViewChild} from '@angular/core';
import {RoomModel} from '../models/RoomModel';
import {FloorModel} from '../models/FloorModel';
import {BookingService} from '../services/booking.service';
import notify from 'devextreme/ui/notify';
import {RoomService} from '../services/room.service';
import {CheckInComponent} from '../check-in/check-in.component';
import {BookingComponent} from '../booking/booking.component';
import {CheckOutComponent} from '../check-out/check-out.component';
import {ClientService} from '../services/client.service';

@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
    @ViewChild(CheckInComponent, {static: false}) checkinComponent;
    @ViewChild(BookingComponent, {static: false}) bookingComponent;
    @ViewChild(CheckOutComponent, {static: false}) checkoutComponent;
    floors: FloorModel[] = [];
    rooms: RoomModel[] = [];
    checkInCheckOutText = [];
    availableAndBookedRoomsName: string[] = [];
    bookingRoomsName: string[] = [];
    updateBookingText = [];

    constructor(
        private bookingService: BookingService,
        private roomService: RoomService,
        private clientService: ClientService,
    ) {}

    ngOnInit() {
        this.rooms = [];
        this.floors = [];
        this.roomService.getRooms().subscribe(data => {
            this.rooms = data;
            this.floors = this.getFloors();
            this.getRoomsName();
        });
        this.checkInCheckOutText = [
            {text: 'Checkin'},
            {text: 'Checkout/Update Service'},
        ];
        this.updateBookingText = [
            {text: 'Update booking'},
        ];
    }

    getFloors() {
        const floors: FloorModel[] = [];
        for (const room of this.rooms) {
            if (floors.find(_ => _.name === room.floor)) {
                floors.find(_ => _.name === room.floor).rooms.push(room);
            } else {
                const rooms: RoomModel[] = [];
                rooms.push(room);
                const floor: FloorModel = {name: room.floor, rooms};
                floors.push(floor);
            }
        }
        return floors;
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
        if (roomBooking.status !== 'Booking' && roomBooking.status !== 'Booked') {
            this.bookingComponent.isVisiblePersonalBookingPopup = true;
            this.bookingComponent.onInit(roomBooking, null, null, null);
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
            this.bookingComponent.isVisibleGroupBookingPopup = true;
            this.bookingComponent.onInit(null, roomsBooking, null, null);
        }
    }

    checkInCheckOut(e, roomName) {
        const room = this.rooms.find(s => s.name === roomName.replace('R', ''));
        if (e.itemData.text === 'Checkin' && room.status === 'Available') {
            this.checkinComponent.isVisiblePersonalCheckinPopup = true;
            this.checkinComponent.onInit(Object.assign({}, room), null, null);
        } else if (e.itemData.text === 'Checkout/Update Service' && room.status === 'Booked') {
            this.checkoutComponent.onInit(room);
            this.checkoutComponent.isVisiblePersonalCheckoutPopup = true;
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
            this.checkinComponent.isVisibleGroupCheckinPopup = true;
            this.checkinComponent.onInit(null, roomsCheckin, null);
        }
    }

    updateBooking(event, roomName) {
        // const bookedClient: BookedClientsListModel[] = this.bookedClientListService.getBookedClientsByRoomName(roomName);
        // if (bookedClient[0].client.roomName === ) {
        //     // personal update
        //     const roomUpdate: RoomModel = bookedClient[0].rooms[0];
        //     this.bookingComponent.onInit(roomUpdate, null, null, bookedClient);
        //     this.bookingComponent.isVisiblePersonalBookingPopup = true;
        // } else {
        //     // group update
        //     // const roomsUpdate: RoomModel[] = this.roomService.getRoom(bookedClient[0].client.roomName).subscribe(data => {
        //     //
        //     // })
        //     // this.bookingComponent.onInit(null, roomsUpdate, null, bookedClient);
        //     // this.bookingComponent.isVisibleGroupBookingPopup = true;
        // }
    }
}
