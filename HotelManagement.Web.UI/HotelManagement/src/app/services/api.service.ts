import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    static apiUrl = 'https://localhost:44330/api/';

    constructor() {
    }
}
