import {ClientModel} from './ClientModel';

export class PersonalBookingDetailModel {
    roomNumber: string;
    price: string;
    checkinTime: string;
    checkoutTime: string;
    prePay: number;
    discount: string;
    notes: string;
    clients: ClientModel[];
}
