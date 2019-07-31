export class ClientModel {
    id: number;
    name: string;
    address: string;
    email: string;
    identityOrPassport: string;
    nationality: string;
    notes: string;
    roomName: string;
    bookedClientListId: number;
    invoiceId: number;

    constructor() {
        this.id = null;
        this.name = 'test';
        this.address = 'test';
        this.email = 'test@test.test';
        this.nationality = 'test';
        this.identityOrPassport = 'test';
        this.notes = 'test';
        this.roomName = null;
        this.bookedClientListId = 0;
        this.invoiceId = 0;
    }

}
