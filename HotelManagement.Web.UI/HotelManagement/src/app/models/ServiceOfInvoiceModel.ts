import {ServiceModel} from './ServiceModel';

export class ServiceOfInvoiceModel {
    id: number;
    quantity: number;
    totalAmount: number;
    serviceId: number;
    service: ServiceModel;
    orderTime: Date;
}
