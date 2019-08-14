import {Component, OnInit, ViewChild} from '@angular/core';
import {ServiceComponent} from '../room-service/service.component';
import {RoomModel} from '../models/RoomModel';
import {RoomService} from '../services/room.service';
import {CheckInComponent} from '../check-in/check-in.component';
import {RoomInfoComponent} from '../room-info/room-info.component';
import {UpdateServiceComponent} from '../update-service/update-service.component';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
    @ViewChild(CheckInComponent, {static: false}) checkinComponent;
    @ViewChild(RoomInfoComponent, {static: false}) roomInfoComponent;
    @ViewChild(UpdateServiceComponent, {static: false}) updateServiceComponent;
    @ViewChild(ServiceComponent, {static: false}) addService;
    isVisibleSearchPopover = false;
    popoverTitle: string;
    searchKey: string;
    roomsResult: RoomModel[] = [];
    rightClickText = [];

    constructor(
        private roomService: RoomService,
    ) {
    }

    ngOnInit() {
        this.rightClickText = [
            {text: 'Checkin'},
            {text: 'Update Service'},
            {text: 'Checkout'},
        ];
    }

    openAddServicePopup() {
        this.addService.isVisibleAddServicePopup = true;
    }

    onSearchKeyChanged() {
        const self = this;
        setTimeout(() => { self.search(); }, 500);
    }

    async search() {
        this.isVisibleSearchPopover = true;
        this.popoverTitle = 'Searching...';
        await this.roomService.getRoomsBySearchKey(this.searchKey).toPromise().then(data => {
            this.roomsResult = data;
            if (data != null) {
                if (data.length === 0) {
                    this.popoverTitle = 'No result';
                }
            }
            if (data.length === 1) {
                this.popoverTitle = data.length + ' room found';
            } else if (data.length > 1) {
                this.popoverTitle = data.length + ' rooms found';
            }
        });
    }

    onFocusInTextBoxSearch() {
        if (this.searchKey.length) {
            this.isVisibleSearchPopover = true;
        }
    }

    clickResultRoom(room: RoomModel) {
        if (room.status === 'Booked') {
            this.checkinComponent.onInit(room);
            this.checkinComponent.isVisiblePersonalCheckinPopup = true;
        } else if (room.status === 'Checked in') {
            this.roomInfoComponent.onInit(room);
            this.roomInfoComponent.isVisiblePersonalCheckoutPopup = true;
        }
    }

    rightClick(e, room: RoomModel) {
        if (e.itemData.text === 'Checkin') {
            if (room.status === 'Booked') {
                this.checkinComponent.onInit(room);
                this.checkinComponent.isVisiblePersonalCheckinPopup = true;
            } else if (room.status === 'Available') {
                this.checkinComponent.onInit(room);
                this.checkinComponent.isVisiblePersonalCheckinPopup = true;
            }
        } else if (e.itemData.text === 'Update Service' && room.status === 'Checked in') {
            this.updateServiceComponent.isVisibleUpdateServicePopup = true;
            this.updateServiceComponent.onInit(room);
        } else if (e.itemData.text === 'Checkout' && room.status === 'Checked in') {
            this.roomInfoComponent.onInit(room);
            this.roomInfoComponent.isVisiblePersonalCheckoutPopup = true;
        }
    }
}
