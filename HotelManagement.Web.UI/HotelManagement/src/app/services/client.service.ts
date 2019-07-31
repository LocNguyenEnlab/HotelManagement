import {Injectable} from '@angular/core';
import {ClientModel} from '../models/ClientModel';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    bookedClients: ClientModel[] = [];
    apiUrl = 'https://localhost:44330/api/client';

    constructor(private http: HttpClient) {
    }

    addClient(client: ClientModel): Observable<ClientModel> {
        return this.http.post<ClientModel>(this.apiUrl, client);
    }

    saveBookedClients(clients) {
        for (const client of clients) {
            this.bookedClients.push(client);
        }
    }

    getBookedClients(): ClientModel[] {
        return this.bookedClients;
    }
}
