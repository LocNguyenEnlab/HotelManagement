import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    // apiValues: Test;
    header: HttpHeaders;

    constructor(
        private httpService: HttpClient,
    ) {
    }

    ngOnInit(): void {
        // this.httpService.get('https://localhost:44330/api/values').subscribe(
        //     (data: Test) => this.apiValues = data,
        //     error => console.log(error)
        // );
    }
}
