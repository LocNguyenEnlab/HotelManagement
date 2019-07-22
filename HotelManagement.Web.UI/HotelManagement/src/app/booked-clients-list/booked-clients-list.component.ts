import {Component, OnInit} from '@angular/core';
import {ClientService} from '../services/client.service';
import {ClientModel} from '../models/ClientModel';

@Component({
    selector: 'app-booked-clients-list',
    templateUrl: './booked-clients-list.component.html',
    styleUrls: ['./booked-clients-list.component.scss']
})
export class BookedClientsListComponent implements OnInit {
    bookedClients: ClientModel[];

    constructor(
        private clientService: ClientService,
    ) {
    }

    ngOnInit() {
        this.bookedClients = this.clientService.getBookedClients();
    }

}
