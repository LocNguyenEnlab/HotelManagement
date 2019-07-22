import {ClientModel} from './ClientModel';
import {RoomModel} from './RoomModel';

export class GroupBookingDetailModel {
    checkinTime: Date;
    checkoutTime: Date;
    prePay: number;
    discount: number;
    notes: string;
    clients: ClientModel[];
    rooms: RoomModel[];
}
