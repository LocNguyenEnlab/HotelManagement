import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    apiValues;
    header: HttpHeaders;

    constructor(
        private httpService: HttpClient,
    ) {
        this.header = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    }

    ngOnInit(): void {
        this.httpService.get('https://localhost:44330/api/values').subscribe(
            (data) => this.apiValues = data,
            error => console.log(error)
        );
        // this.apiValues = this.httpService.get('https://localhost:44330/api/values', {responseType: 'text'});
    }
}
