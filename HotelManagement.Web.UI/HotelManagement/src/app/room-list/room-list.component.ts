import {Component, OnInit} from '@angular/core';
import {RoomModel} from '../Model/RoomModel';
import {FloorModel} from '../Model/FloorModel';

@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
    rooms: RoomModel[] = [
        {name: '100', status: 'Available', price: 300000},
        {name: '101', status: 'Available', price: 300045},
        {name: '102', status: 'Booking', price: 348000},
        {name: '200', status: 'Available', price: 400000},
        {name: '201', status: 'Available', price: 34500000},
        {name: '300', status: 'Available', price: 300000},
        {name: '301', status: 'Booked', price: 3000540},
        {name: '302', status: 'Available', price: 340000},
        {name: '303', status: 'Available', price: 300000},
    ];
    rooms1: RoomModel[] = [
        {name: '100', status: 'Available', price: 300000},
        {name: '101', status: 'Available', price: 300045},
        {name: '102', status: 'Booking', price: 348000},
    ];
    rooms2: RoomModel[] = [
        {name: '200', status: 'Available', price: 400000},
        {name: '201', status: 'Available', price: 34500000},
    ];
    rooms3: RoomModel[] = [
        {name: '300', status: 'Available', price: 300000},
        {name: '301', status: 'Booked', price: 3000540},
        {name: '302', status: 'Available', price: 340000},
        {name: '303', status: 'Available', price: 300000},
    ];
    floors: FloorModel[] = [
        {name: '1', rooms: this.rooms1},
        {name: '2', rooms: this.rooms2},
        {name: '3', rooms: this.rooms3},
    ];
    isVisibleBooking = false;
    Information: string;
    roomBooking: RoomModel = {name: '303', status: 'Available', price: 0};
    dateNow: Date;

    constructor() {
    }

    ngOnInit() {
        this.dateNow = new Date();
    }

    chooseRoom(id) {
        if (this.rooms.find(s => s.name === id).status === 'Available') {
            // @ts-ignore
            document.getElementById(id).style.backgroundColor = 'violet';
            this.rooms.find(s => s.name === id).status = 'BookingTemp';
        } else if (this.rooms.find(s => s.name === id).status === 'BookingTemp') {
            this.rooms.find(s => s.name === id).status = 'Available';
            // @ts-ignore
            document.getElementById(id).style.backgroundColor = 'green';
        }
    }

    bookRoom(id) {
        if (this.rooms && this.rooms.length > 0) {
            const room = this.rooms.find(s => s.name === id);
            if (room) {
                if (room.status !== 'Booking' && room.status !== 'Booked') {
                    this.roomBooking = room;
                    this.Information = 'Booking Room' + id;
                    this.isVisibleBooking = true;
                }
            }
        }
    }
}
