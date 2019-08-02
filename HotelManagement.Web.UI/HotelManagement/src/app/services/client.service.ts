import {Injectable} from '@angular/core';
import {ClientModel} from '../models/ClientModel';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    apiUrl = ApiService.apiUrl + 'client/';

    constructor(private http: HttpClient) {
    }

    addClient(client: ClientModel): Observable<ClientModel> {
        return this.http.post<ClientModel>(this.apiUrl, client);
    }

    getClients(): Observable<ClientModel[]> {
        return this.http.get<ClientModel[]>(this.apiUrl);
    }

    getClientsByRoomName(roomName: string): Observable<ClientModel[]> {
        return this.http.get<ClientModel[]>(this.apiUrl + 'roomname/' + roomName);
    }
}
