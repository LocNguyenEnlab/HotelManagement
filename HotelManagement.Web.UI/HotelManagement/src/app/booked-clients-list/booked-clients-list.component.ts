import {Component, OnInit} from '@angular/core';
import {BookedClientsListModel} from '../models/BookedClientsListModel';
import {BookedClientsListService} from '../services/booked-clients-list.service';

@Component({
    selector: 'app-booked-clients-list',
    templateUrl: './booked-clients-list.component.html',
    styleUrls: ['./booked-clients-list.component.scss']
})
export class BookedClientsListComponent implements OnInit {
    bookedClientsList: BookedClientsListModel[];

    constructor(
        private bookedClientsListService: BookedClientsListService,
    ) {
    }

    ngOnInit() {
        this.bookedClientsList = this.bookedClientsListService.getBookedClientsList();
    }

}
