import {ClientModel} from './ClientModel';

export class RoomModel {
    name: string;
    status: string;
    price: number;
    type: string;
    clients: ClientModel[];
}
