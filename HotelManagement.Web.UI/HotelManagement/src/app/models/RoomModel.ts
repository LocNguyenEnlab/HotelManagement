import {ClientModel} from './ClientModel';

export class RoomModel {
    name: string;
    status: string;
    price: number;
    type: string;
    checkinTime: Date;
    checkoutTime: Date;
    clients: ClientModel[];
    floor: string;

    constructor() {
        this.name = '';
        this.status = '';
        this.price = 0;
        this.type = '';
        this.checkinTime = new Date();
        this.checkoutTime = new Date();
        this.checkoutTime.setHours(12, 0, 0);
        this.checkoutTime.setDate(new Date().getDate() + 1);
        this.clients = [];
        this.floor = '';
    }
}
