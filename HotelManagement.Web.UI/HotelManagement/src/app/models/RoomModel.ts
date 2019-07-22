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
}
