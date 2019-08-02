export class ClientModel {
    id: number;
    name: string;
    address: string;
    email: string;
    identityOrPassport: string;
    nationality: string;
    notes: string;
    roomName: string;
    invoiceId: number;
    checkinTime: Date;
    checkoutTime: Date;
    code: number;
    bookType: string;
    prePay: number;
    status: string; // booking or checkin
    discount: number;

    constructor(init?: Partial<ClientModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }

}
