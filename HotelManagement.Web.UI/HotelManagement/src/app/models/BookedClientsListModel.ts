export class BookedClientsListModel {
    contactName: string;
    checkinTime: Date;
    checkoutTime: Date;
    code: string;
    bookType: string;
    prePay: number;
    notes: string;
    createdTime: Date;
    roomName: string[];
    type: string; // booking or checkin
}
