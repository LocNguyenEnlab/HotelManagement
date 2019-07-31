import {Injectable} from '@angular/core';
import {RoomModel} from '../models/RoomModel';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    apiUrl = 'https://localhost:44330/api/room';

    constructor(private http: HttpClient) {
    }

    getRooms(): Observable<RoomModel[]> {
        return this.http.get<RoomModel[]>(this.apiUrl);
    }

    updateRoom(room: RoomModel): Observable<RoomModel> {
        return this.http.put<RoomModel>(this.apiUrl, room);
    }
}
