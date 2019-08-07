import {ServiceModel} from './ServiceModel';

export class ServiceOfInvoiceModel {
    id: number;
    quantity: number;
    totalMoney: number;
    serviceId: number;
    service: ServiceModel;
}
