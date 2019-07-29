import {ClientModel} from './ClientModel';
import {ServiceModel} from './ServiceModel';

export class RoomModel {
    name: string;
    status: string;
    price: number;
    type: string;
    checkinTime: Date;
    checkoutTime: Date;
    clients: ClientModel[];
    services: ServiceModel[];
    floor: string;

    constructor() {
        this.name = '';
        this.status = '';
        this.price = 0;
        this.type = '';
        this.checkinTime = new Date();
        this.checkoutTime = new Date();
        this.clients = [];
        this.services = [];
        this.floor = '';
    }
}
