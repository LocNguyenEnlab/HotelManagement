import {Injectable} from '@angular/core';
import {RoomModel} from '../models/RoomModel';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    apiUrl: string = ApiService.apiUrl + 'room/';

    constructor(private http: HttpClient) {
    }

    getRooms(): Observable<RoomModel[]> {
        return this.http.get<RoomModel[]>(this.apiUrl);
    }

    getRoom(roomName: string): Observable<RoomModel> {
        return this.http.get<RoomModel>(this.apiUrl + roomName);
    }

    updateRoom(room: RoomModel): Observable<RoomModel> {
        return this.http.put<RoomModel>(this.apiUrl, room);
    }
}
