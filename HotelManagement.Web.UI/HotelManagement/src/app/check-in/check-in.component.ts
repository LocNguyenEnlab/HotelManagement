import {Component, OnInit, ViewChild} from '@angular/core';
import {RoomModel} from '../models/RoomModel';
import {PersonalBookingDetailModel} from '../models/PersonalBookingDetailModel';
import {ClientModel} from '../models/ClientModel';
import {BookedClientsListModel} from '../models/BookedClientsListModel';
import {BookedClientsListService} from '../services/booked-clients-list.service';
import notify from 'devextreme/ui/notify';
import {RoomService} from '../services/room.service';
import {Router} from '@angular/router';
import {GroupBookingDetailModel} from '../models/GroupBookingDetailModel';
import {ServiceModel} from '../models/ServiceModel';
import {ServiceService} from '../services/service.service';
import {ServiceTypeModel} from '../models/ServiceTypeModel';
import {InvoiceService} from '../services/invoice.service';
import {InvoiceModel} from '../models/InvoiceModel';
import {ClientService} from '../services/client.service';

@Component({
    selector: 'app-check-in',
    templateUrl: './check-in.component.html',
    styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {
    @ViewChild('serviceBox', {static: false}) serviceBox;
    @ViewChild('quantityBox', {static: false}) quantityBox;
    @ViewChild('typeBox', {static: false}) typeBox;
    isVisiblePersonalCheckinPopup = false;
    isVisibleGroupCheckinPopup = false;
    titlePersonalCheckin: string;
    serviceValue: ServiceModel;
    serviceSource: ServiceModel[] = [];
    serviceName: string = null;
    serviceQuantitySource: number[] = [];
    serviceQuantityValue: number = null;
    serviceTypeSource: ServiceTypeModel[] = [];
    serviceTypeName: string = null;
    roomCheckin: RoomModel = new RoomModel();
    servicesCheckin: ServiceModel[] = [];
    personalBookingDetail: PersonalBookingDetailModel = {
        room: this.roomCheckin,
        prePay: 0,
        discount: 0,
        notes: '',
        clients: [],
    };
    client: ClientModel = new ClientModel();
    rooms: RoomModel[] = [];
    groupBookingDetail: GroupBookingDetailModel = {
        checkinTime: new Date(),
        checkoutTime: new Date(),
        prePay: 0,
        discount: 0,
        notes: '',
        clients: [],
        rooms: []
    };
    roomsCheckin: RoomModel[] = [];
    bookedClientCheckin: BookedClientsListModel;

    constructor(
        private bookedClientsListService: BookedClientsListService,
        private roomService: RoomService,
        private router: Router,
        private service: ServiceService,
        private invoiceService: InvoiceService,
        private clientService: ClientService,
    ) {
    }

    ngOnInit() {
        this.roomService.getRooms().subscribe(data => {
            this.rooms = data;
        });
        this.serviceSource = this.service.getServices();
        this.serviceQuantitySource = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10];
        this.serviceTypeSource = this.service.getServicesType();
    }

    onInit(roomCheckin: RoomModel, roomsCheckin: RoomModel[], bookedClientCheckin: BookedClientsListModel) {
        if (roomCheckin != null) {
             this.roomCheckin = roomCheckin;
        }
        if (roomsCheckin != null) {
            this.roomsCheckin = roomsCheckin;
        }
        if (bookedClientCheckin != null && bookedClientCheckin.bookType === 'Personal Booking') {
            this.personalBookingDetail = {
                room: bookedClientCheckin.rooms[0],
                prePay: bookedClientCheckin.prePay,
                discount: bookedClientCheckin.discount,
                notes: bookedClientCheckin.notes,
                clients: [bookedClientCheckin.client],
            };
            this.bookedClientCheckin = bookedClientCheckin;
            this.client = Object.assign({}, this.personalBookingDetail.clients[0]);
            this.roomCheckin = this.personalBookingDetail.room;
        }
        if (bookedClientCheckin != null && bookedClientCheckin.bookType === 'Group Booking') {
            this.groupBookingDetail = {
                checkinTime: bookedClientCheckin.checkoutTime,
                checkoutTime: bookedClientCheckin.checkoutTime,
                prePay: bookedClientCheckin.prePay,
                discount: bookedClientCheckin.discount,
                notes: bookedClientCheckin.notes,
                clients: [bookedClientCheckin.client],
                rooms: bookedClientCheckin.rooms,
            };
            this.bookedClientCheckin = bookedClientCheckin;
            this.client = Object.assign({}, this.groupBookingDetail.clients[0]);
            this.roomsCheckin = this.groupBookingDetail.rooms;
        }
        this.titlePersonalCheckin = 'Personal checkin for room ' + this.roomCheckin.name + ' (' + this.roomCheckin.type + ')';
    }
    cancel() {
        this.isVisiblePersonalCheckinPopup = false;
    }

    addBookedClientsList(id: number = null, clients: ClientModel[], checkinTime: Date, checkoutTime: Date, bookType, code, prePay, rooms, discount) {
        for (const client of clients) {
            const bookedClient: BookedClientsListModel = {
                id,
                client,
                checkinTime,
                checkoutTime,
                code,
                bookType,
                prePay,
                notes: client.notes,
                createdTime: new Date(),
                rooms,
                status: 'Checkin',
                discount
            };
            if (id != null) {
                this.bookedClientsListService.updateBookedClientList(bookedClient);
            } else {
                this.bookedClientsListService.addBookedClientList(bookedClient);
            }
        }
    }

    checkinForPersonal() {
        if (this.roomCheckin.clients.length > 0) {
            this.updateRooms(this.roomCheckin.clients);
            const rooms: RoomModel[] = [];
            rooms.push(this.roomCheckin);
            if (this.bookedClientCheckin) { // add new
                this.addBookedClientsList(this.bookedClientCheckin.id, this.roomCheckin.clients, this.roomCheckin.checkinTime,
                    this.roomCheckin.checkoutTime, 'Personal Booking', '-1', this.personalBookingDetail.prePay, rooms,
                    this.personalBookingDetail.discount);
            } else { // update booking exists
                this.addBookedClientsList(null, this.roomCheckin.clients, this.roomCheckin.checkinTime,
                    this.roomCheckin.checkoutTime, 'Personal Booking', '-1',
                    this.personalBookingDetail.prePay, rooms, this.personalBookingDetail.discount);
            }
            this.invoiceService.addInvoice(this.createInvoice(this.roomCheckin, this.personalBookingDetail.discount,
                this.personalBookingDetail.prePay));
            notify('Checkin successfully', 'success');
            this.router.navigate(['/booked-clients-list']);
            this.isVisiblePersonalCheckinPopup = false;
        } else {
            notify('Please add clients for this room!', 'error');
        }
    }

    createInvoice(roomBooking: RoomModel, discount: number, prePay: number) {
        let totalPayment: number;
        let totalRoomMoney: number;
        let totalServiceMoney = 0;
        const rentTime = Math.ceil((+roomBooking.checkoutTime - +roomBooking.checkinTime) / (24 * 60 * 60 * 1000));
        for (const service of this.servicesCheckin) {
            totalServiceMoney += service.price * service.quantity;
        }
        totalRoomMoney = roomBooking.price * rentTime;
        totalPayment = totalRoomMoney + totalServiceMoney;
        if (discount) {
            totalPayment *= (discount / 100);
        }
        const invoice: InvoiceModel = {
            id: null,
            room: roomBooking,
            clients: roomBooking.clients,
            rentTime,
            totalRoomMoney,
            totalServiceMoney,
            totalPayment,
            discount,
            status: 'Unpaid',
            notes: '',
            checkinTime: roomBooking.checkinTime,
            checkoutTime: roomBooking.checkoutTime,
            prePay,
            services: this.servicesCheckin
        };
        return invoice;
    }

    updateRooms(clients) {
        if (this.isVisiblePersonalCheckinPopup) {
            // const roomName = this.roomCheckin.name;
            // if (this.rooms.find(s => s.name === roomName)) {
            //     this.rooms.find(s => s.name === roomName).status = 'Booked';
            //     for (const client of clients) {
            //         this.rooms.find(s => s.name === roomName).checkinTime = this.roomCheckin.checkinTime;
            //         this.rooms.find(s => s.name === roomName).checkoutTime = this.roomCheckin.checkoutTime;
            //     }
            // }
            this.roomCheckin.status = 'Booked';
            this.roomService.updateRoom(this.roomCheckin).subscribe();
        } else if (this.isVisibleGroupCheckinPopup) {
            for (const room of this.roomsCheckin) {
                if (this.rooms.find(s => s.name === room.name)) {
                    this.rooms.find(s => s.name === room.name).status = 'Booked';
                    for (const client of clients) {
                        this.rooms.find(s => s.name === room.name).checkinTime = this.groupBookingDetail.checkinTime;
                        this.rooms.find(s => s.name === room.name).checkoutTime = this.groupBookingDetail.checkoutTime;
                    }
                }
            }
        }
        // this.roomService.updateRooms(this.rooms);
    }

    addClientInfoOfPersonalBooking() {
        if ((this.roomCheckin.type === 'Single' && !this.roomCheckin.clients) || this.roomCheckin.type === 'Double') {
            const clientTemp: ClientModel = Object.assign({}, this.client);
            clientTemp.bookedClientListId = 1;
            this.roomCheckin.clients = [];
            this.roomCheckin.clients.push(clientTemp);
            this.clientService.addClient(clientTemp).subscribe();
            // this.resetClientInput();
            // this.personalBookingDetail.clients.push(clientTemp);
        } else {
            notify('Can not add more than one client for Single room!', 'warning');
        }
    }

    addClientInfoOfGroupBooking() {
        const clientTemp: ClientModel = Object.assign({}, this.client);
        this.groupBookingDetail.clients.push(clientTemp);
        // this.resetClientInput();
    }

    checkinForGroup() {
        if (this.bookedClientCheckin) {
            this.addBookedClientsList(this.bookedClientCheckin.id, this.groupBookingDetail.clients, this.groupBookingDetail.checkinTime,
                this.groupBookingDetail.checkoutTime, 'Group Booking', '-1', this.groupBookingDetail.prePay, this.roomsCheckin,
                this.groupBookingDetail.discount);
        } else {
            this.addBookedClientsList(null, this.groupBookingDetail.clients, this.groupBookingDetail.checkinTime,
                this.groupBookingDetail.checkoutTime, 'Group Booking', '-1', this.groupBookingDetail.prePay,
                this.roomsCheckin, this.groupBookingDetail.discount);
        }
        notify('Checkin successfully', 'success');
        this.updateRooms(this.groupBookingDetail.clients);
        this.router.navigate(['/booked-clients-list']);
        this.isVisibleGroupCheckinPopup = false;
    }

    cancelGroupCheckin() {
        this.isVisibleGroupCheckinPopup = false;
    }

    chooseService(event: Event) {
        // @ts-ignore
        this.serviceValue = event.addedItems[0];
        this.serviceName = this.serviceValue.name;
        this.serviceBox.instance.close();
    }

    chooseQuantity(event: Event) {
        // @ts-ignore
        this.serviceQuantityValue = event.addedItems[0];
        this.quantityBox.instance.close();
    }

    chooseServiceType(event: Event) {
        // @ts-ignore
        this.serviceTypeName = event.addedItems[0].typeName;
        // @ts-ignore
        this.serviceSource = this.service.getServicesByTypeId(event.addedItems[0].id);
        this.serviceName = null;
        this.typeBox.instance.close();
    }

    addService() {
        if (this.serviceQuantityValue != null && this.serviceValue != null) {
            const service: ServiceModel = this.servicesCheckin.find(_ => _.id === this.serviceValue.id);
            if (service) {
                service.quantity += this.serviceQuantityValue;
            } else {
                this.serviceValue.quantity = this.serviceQuantityValue;
                this.serviceValue.totalMoney = this.serviceValue.quantity * this.serviceValue.price;
                this.servicesCheckin.push(this.serviceValue);
            }
        } else {
            notify('Please select service and quantity of it', 'error');
        }
    }
}
