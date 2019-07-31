import {ClientModel} from './ClientModel';
import {RoomModel} from './RoomModel';

export class BookedClientsListModel {
    id: number;
    client: ClientModel;
    checkinTime: Date;
    checkoutTime: Date;
    code: string;
    bookType: string;
    prePay: number;
    notes: string;
    createdTime: Date;
    rooms: RoomModel[];
    status: string; // booking or checkin
    discount: number;
}
