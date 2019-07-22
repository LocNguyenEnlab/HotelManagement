import {ClientModel} from './ClientModel';
import {RoomModel} from './RoomModel';

export class PersonalBookingDetailModel {
    room: RoomModel;
    prePay: number;
    discount: number;
    notes: string;
    clients: ClientModel[];
}
