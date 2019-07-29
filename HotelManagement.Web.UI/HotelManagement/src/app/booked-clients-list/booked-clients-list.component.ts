import {Component, OnInit, ViewChild} from '@angular/core';
import {BookedClientsListModel} from '../models/BookedClientsListModel';
import {BookedClientsListService} from '../services/booked-clients-list.service';
import notify from 'devextreme/ui/notify';
// @ts-ignore
import {event} from 'devextreme/bundles/dx.all';
import {CheckInComponent} from '../check-in/check-in.component';
import {DxDataGridComponent} from 'devextreme-angular';
import {BookingComponent} from '../booking/booking.component';
import {RoomModel} from '../models/RoomModel';
import { confirm } from 'devextreme/ui/dialog';
import {RoomService} from '../services/room.service';

@Component({
    selector: 'app-booked-clients-list',
    templateUrl: './booked-clients-list.component.html',
    styleUrls: ['./booked-clients-list.component.scss']
})
export class BookedClientsListComponent implements OnInit {
    @ViewChild(CheckInComponent, {static: false}) checkinComponent;
    @ViewChild(DxDataGridComponent, {static: false}) dataGrid: DxDataGridComponent;
    @ViewChild(BookingComponent, {static: false}) bookingComponent;
    bookedClientsList: BookedClientsListModel[];
    searchOptions: string[];
    searchOption: string;
    searchText: string;
    focusBookedClientId: number;
    bookedClientCheckin: BookedClientsListModel;

    constructor(
        private bookedClientsListService: BookedClientsListService,
        private roomService: RoomService,
    ) {
    }

    ngOnInit() {
        this.bookedClientsList = this.bookedClientsListService.getBookedClientsList();
        this.searchOptions = [
            'Code',
            'Room Name'
        ];
        this.searchOption = this.searchOptions[0];
    }

    checkin() {
        if (this.bookedClientCheckin && this.bookedClientCheckin.type === 'Booking') {
            if (this.bookedClientCheckin.bookType === 'Personal Booking') {
                this.checkinComponent.onInit(null, null, this.bookedClientCheckin);
                CheckInComponent.isVisiblePersonalCheckinPopup = true;
            } else {
                this.checkinComponent.onInit(null, null, this.bookedClientCheckin);
                CheckInComponent.isVisibleGroupCheckinPopup = true;
            }
        } else if (this.bookedClientCheckin) {
            notify('This client already check in!', 'error', 2000);
        } else {
            notify('Please select a client to check in!', 'error', 2000);
        }
    }

    changeSearchOption(e) {
        this.searchOption = e.value;
    }

    search() {
        if (this.searchText) {
            if (this.searchOption === this.searchOptions[0]) {
                this.focusBookedClientId = this.bookedClientsListService.getBookedClientIdByCode(this.searchText);
                this.dataGrid.instance.option('focusedRowKey', this.focusBookedClientId);
                console.log('search ' + this.focusBookedClientId);
            } else if (this.searchOption === this.searchOptions[1]) {
                this.focusBookedClientId = this.bookedClientsListService.getBookedClientIdByRoomName(this.searchText);
                this.dataGrid.instance.option('focusedRowKey', this.focusBookedClientId);
            }
        } else {
            notify('Please fill in search text box to search!', 'warning', 2000);
        }
    }

    onFocusedRowChanged(e: event) {
        this.focusBookedClientId = e.component.option('focusedRowKey');
        this.bookedClientCheckin = this.bookedClientsListService.getBookedClientById(+this.focusBookedClientId);
    }

    customRoomsText(params) {
        let roomName = '';
        for (const param of params.value) {
            roomName += param.name + ', ';
        }
        return roomName;
    }

    update() {
        if (this.focusBookedClientId != null) {
            const bookedClient: BookedClientsListModel = this.bookedClientsListService.getBookedClientById(this.focusBookedClientId);
            if (bookedClient.bookType === 'Personal Booking') {
                const roomBooking: RoomModel = bookedClient.rooms[0];
                this.bookingComponent.onInit(roomBooking, null, bookedClient, null);
                BookingComponent.isVisiblePersonalBookingPopup = true;
            }
        } else {
            notify('Please select a client to update!', 'error', 2000);
        }
    }

    cancelBooking() {
        if (this.focusBookedClientId != null) {
            const bookedClient: BookedClientsListModel = this.bookedClientsListService.getBookedClientById(this.focusBookedClientId);
            if (bookedClient.type === 'Booking') {
                const confirmResult = confirm('Are you sure cancel this booking?', 'Confirm before cancel booking');
                confirmResult.then((dialogResult) => {
                    if (dialogResult) {
                        if (bookedClient.bookType === 'Personal Booking') {
                            const room = bookedClient.rooms[0];
                            const clientIndex = room.clients.findIndex(_ => _.identityOrPassport === bookedClient.client.identityOrPassport);
                            room.clients.splice(clientIndex, 1);
                            if (room.clients.length === 0) {
                                room.status = 'Available';
                            }
                            this.roomService.updateRoom(room);
                        } else if (bookedClient.bookType === 'Group Booking') {
                            for (const room of bookedClient.rooms) {
                                const clientIndex = room.clients.findIndex(_ => _.identityOrPassport === bookedClient.client.identityOrPassport);
                                if (clientIndex !== -1) {
                                    room.clients.splice(clientIndex, 1);
                                }
                                if (room.clients.length === 0) {
                                    room.status = 'Available';
                                }
                            }
                        }
                        const index = this.bookedClientsList.findIndex(s => s.id === this.focusBookedClientId);
                        this.bookedClientsList.splice(index, 1);
                        this.deleteBookedClientsList(this.bookedClientsList);
                    }
                });
            } else {
                notify('This client was check in, can not cancel booking!', 'warning');
            }
        } else {
            notify('Please select a client to cancel booking!', 'error', 2000);
        }
    }

    deleteBookedClientsList(bookedClientList) {
        this.bookedClientsListService.delete(bookedClientList);
    }
}
