import {Injectable} from '@angular/core';
import {ServiceModel} from '../models/ServiceModel';
import {ServiceTypeModel} from '../models/ServiceTypeModel';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    apiServiceUrl = ApiService.apiUrl + 'service/';
    apiServiceTypeUrl = ApiService.apiUrl + 'servicetype/';

    constructor(
        private http: HttpClient,
    ) {
    }

    getServices(): Observable<ServiceModel[]> {
        return this.http.get<ServiceModel[]>(this.apiServiceUrl);
    }

    getServicesType(): Observable<ServiceTypeModel[]> {
        return this.http.get<ServiceTypeModel[]>(this.apiServiceTypeUrl);
    }

    add(service: ServiceModel): Observable<ServiceModel> {
        return this.http.post<ServiceModel>(this.apiServiceUrl, service);
    }

    update(service: ServiceModel): Observable<ServiceModel> {
        return this.http.put<ServiceModel>(this.apiServiceUrl, service);
    }

    delete(serviceId: number): Observable<number> {
        return this.http.delete<number>(this.apiServiceUrl + serviceId);
    }
}
