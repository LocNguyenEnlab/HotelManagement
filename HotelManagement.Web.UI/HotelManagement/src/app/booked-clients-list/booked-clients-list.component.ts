import {Component, OnInit, ViewChild} from '@angular/core';
import notify from 'devextreme/ui/notify';
// @ts-ignore
import {event} from 'devextreme/bundles/dx.all';
import {CheckInComponent} from '../check-in/check-in.component';
import {DxDataGridComponent} from 'devextreme-angular';
import {BookingComponent} from '../booking/booking.component';
import {RoomModel} from '../models/RoomModel';
import { confirm } from 'devextreme/ui/dialog';
import {RoomService} from '../services/room.service';
import {ClientService} from '../services/client.service';
import {ClientModel} from '../models/ClientModel';

@Component({
    selector: 'app-booked-clients-list',
    templateUrl: './booked-clients-list.component.html',
    styleUrls: ['./booked-clients-list.component.scss']
})
export class BookedClientsListComponent implements OnInit {
    @ViewChild(CheckInComponent, {static: false}) checkinComponent;
    @ViewChild(DxDataGridComponent, {static: false}) dataGrid: DxDataGridComponent;
    @ViewChild(BookingComponent, {static: false}) bookingComponent;
    searchOptions: string[] = [];
    searchOption: string;
    searchText: string;
    focusBookedClientId: number;
    clientsList: ClientModel[];
    clientCheckin: ClientModel;

    constructor(
        private roomService: RoomService,
        private clientService: ClientService,
    ) {
    }

    async ngOnInit() {
        await this.clientService.getClients().toPromise().then(data => {
            this.clientsList = data;
        });

        this.searchOptions = [
            'Code',
            'Room Name'
        ];
        this.searchOption = this.searchOptions[0];
    }

    checkin() {
        if (this.clientCheckin && this.clientCheckin.status === 'Booking') {
            if (this.clientCheckin.bookType === 'Personal Booking') {
                this.checkinComponent.onInit(this.clientCheckin);
                this.checkinComponent.isVisiblePersonalCheckinPopup = true;
            } else {
                // this.checkinComponent.onInit(null, null, this.clientCheckin);
                // this.checkinComponent.isVisibleGroupCheckinPopup = true;
            }
        } else if (this.clientCheckin) {
            notify('This client already check in!', 'error', 2000);
        } else {
            notify('Please select a client to check in!', 'error', 2000);
        }
    }

    changeSearchOption(e) {
        this.searchOption = e.value;
    }

    search() {
        // if (this.searchText) {
        //     if (this.searchOption === this.searchOptions[0]) {
        //         this.focusBookedClientId = this.bookedClientsListService.getBookedClientIdByCode(this.searchText);
        //         this.dataGrid.instance.option('focusedRowKey', this.focusBookedClientId);
        //         console.log('search ' + this.focusBookedClientId);
        //     } else if (this.searchOption === this.searchOptions[1]) {
        //         this.focusBookedClientId = this.bookedClientsListService.getBookedClientIdByRoomName(this.searchText);
        //         this.dataGrid.instance.option('focusedRowKey', this.focusBookedClientId);
        //     }
        // } else {
        //     notify('Please fill in search text box to search!', 'warning', 2000);
        // }
    }

    onFocusedRowChanged(e: event) {
        this.focusBookedClientId = e.component.option('focusedRowKey');
        this.clientCheckin = this.clientsList.find(_ => _.id === this.focusBookedClientId);
    }

    getRoomName(params) {
        // console.log(params);
        return params.roomName;
    }

    update() {
        // if (this.focusBookedClientId != null) {
        //     const bookedClient: BookedClientsListModel = this.bookedClientsListService.getBookedClientById(this.focusBookedClientId);
        //     if (bookedClient.bookType === 'Personal Booking') {
        //         let roomBooking: RoomModel;
        //         this.roomService.getRoom(bookedClient.client.roomName).subscribe(data => {
        //             roomBooking = data;
        //             this.bookingComponent.onInit(roomBooking, null, bookedClient, null);
        //             this.bookingComponent.isVisiblePersonalBookingPopup = true;
        //         });
        //     }
        // } else {
        //     notify('Please select a client to update!', 'error', 2000);
        // }
    }

    cancelBooking() {
        // if (this.focusBookedClientId != null) {
        //     const bookedClient: BookedClientsListModel = this.bookedClientsListService.getBookedClientById(this.focusBookedClientId);
        //     if (bookedClient.status === 'Booking') {
        //         const confirmResult = confirm('Are you sure cancel this booking?', 'Confirm before cancel booking');
        //         confirmResult.then((dialogResult) => {
        //             if (dialogResult) {
        //                 if (bookedClient.bookType === 'Personal Booking') {
        //                     let room: RoomModel;
        //                     this.roomService.getRoom(bookedClient.client.roomName).subscribe( data => {
        //                         room = data;
        //                         const clientIndex = room.clients.findIndex(_ => _.identityOrPassport === bookedClient.client.identityOrPassport);
        //                         room.clients.splice(clientIndex, 1);
        //                         if (room.clients.length === 0) {
        //                             room.status = 'Available';
        //                         }
        //                         this.roomService.updateRoom(room);
        //                     });
        //                 } else if (bookedClient.bookType === 'Group Booking') {
        //                     // for (const room of bookedClient.rooms) {
        //                     //     const clientIndex = room.clients.findIndex(_ => _.identityOrPassport === bookedClient.client.identityOrPassport);
        //                     //     if (clientIndex !== -1) {
        //                     //         room.clients.splice(clientIndex, 1);
        //                     //     }
        //                     //     if (room.clients.length === 0) {
        //                     //         room.status = 'Available';
        //                     //     }
        //                     // }
        //                 }
        //                 const index = this.bookedClientsList.findIndex(s => s.id === this.focusBookedClientId);
        //                 this.bookedClientsList.splice(index, 1);
        //                 this.deleteBookedClientsList(this.bookedClientsList);
        //             }
        //         });
        //     } else {
        //         notify('This client was check in, can not cancel booking!', 'warning');
        //     }
        // } else {
        //     notify('Please select a client to cancel booking!', 'error', 2000);
        // }
    }

    deleteBookedClientsList(bookedClientList) {
        // this.bookedClientsListService.delete(bookedClientList);
    }
}
