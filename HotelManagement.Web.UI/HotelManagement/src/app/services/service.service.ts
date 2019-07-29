import {Injectable} from '@angular/core';
import {ServiceModel} from '../models/ServiceModel';
import {ServiceTypeModel} from '../models/ServiceTypeModel';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    servicesType: ServiceTypeModel[] = [
        {id: 1, typeName: 'Drink'},
        {id: 2, typeName: 'Food'}
    ];

    services: ServiceModel[] = [
        {id: 1, name: 'Water', price: 30000, typeId: 1, quantity: 0},
        {id: 2, name: 'Coca Cola', price: 35000, typeId: 1, quantity: 0},
        {id: 3, name: 'Pepsi', price: 40000, typeId: 1, quantity: 0},
        {id: 4, name: 'Huda', price: 20000, typeId: 1, quantity: 0},
        {id: 5, name: 'Tiger', price: 40000, typeId: 1, quantity: 0},
        {id: 6, name: 'Budweiser', price: 50000, typeId: 1, quantity: 0},
        {id: 7, name: 'Voka', price: 80000, typeId: 1, quantity: 0},
        {id: 8, name: 'Hamburger', price: 20000, typeId: 2, quantity: 0},
        {id: 9, name: 'Pizza', price: 800000, typeId: 2, quantity: 0},
        {id: 10, name: 'Sushi', price: 180000, typeId: 2, quantity: 0},
    ];

    constructor() {
    }

    getServices(): ServiceModel[] {
        return this.services;
    }

    getServicesType(): ServiceTypeModel[] {
        return this.servicesType;
    }

    getServicesByTypeId(typeId: number) {
        const services: ServiceModel[] = [];
        for (const service of this.services) {
            if (service.typeId === typeId) {
                services.push(service);
            }
        }
        return services;
    }
}
