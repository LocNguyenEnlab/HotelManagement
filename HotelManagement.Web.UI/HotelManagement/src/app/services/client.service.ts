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

    update(client: ClientModel): Observable<ClientModel> {
        return this.http.put<ClientModel>(this.apiUrl, client);
    }

    delete(clientId: number): Observable<number> {
        return this.http.delete<number>(this.apiUrl + clientId);
    }
}
