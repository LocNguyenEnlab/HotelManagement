import {Component, OnInit, ViewChild} from '@angular/core';
import {BookedClientsListModel} from '../models/BookedClientsListModel';
import {BookedClientsListService} from '../services/booked-clients-list.service';
import notify from 'devextreme/ui/notify';
// @ts-ignore
import {event} from 'devextreme/bundles/dx.all';
import {CheckInComponent} from '../check-in/check-in.component';

@Component({
    selector: 'app-booked-clients-list',
    templateUrl: './booked-clients-list.component.html',
    styleUrls: ['./booked-clients-list.component.scss']
})
export class BookedClientsListComponent implements OnInit {
    @ViewChild(CheckInComponent, {static: false}) checkinComponent;
    bookedClientsList: BookedClientsListModel[];
    searchOptions: string[];
    searchOption: string;
    searchText: string;
    focusBookedClientId: number;
    bookedClientCheckin: BookedClientsListModel;

    constructor(
        private bookedClientsListService: BookedClientsListService,
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
                this.focusBookedClientId = this.bookedClientsListService.getBookedClientByCode(this.searchText);
            } else if (this.searchOption === this.searchOptions[1]) {
                this.focusBookedClientId = this.bookedClientsListService.getBookedClientByRoomName(this.searchText);
            }
        } else {
            notify('Please fill in search text box to search!', 'warning', 2000);
        }
    }

    onFocusedRowChanged(e: event) {
        console.log(e);
        this.focusBookedClientId = e.row.data.id;
        this.bookedClientCheckin = e.row.data;
        console.log('focusBookedClientID ' + this.focusBookedClientId);
        console.log('' + e.row.data.id);
    }

    customRoomsText(params) {
        let roomName = '';
        for (const param of params.value) {
            roomName += param.name + ', ';
        }
        return roomName;
    }
}
