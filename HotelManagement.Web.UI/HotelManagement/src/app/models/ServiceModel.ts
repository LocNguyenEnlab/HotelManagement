import {ServiceTypeModel} from './ServiceTypeModel';

export class ServiceModel {
    id: number;
    name: string;
    price: number;
    serviceTypeId: number;
    serviceType: ServiceTypeModel;

    constructor(init?: Partial<ServiceModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
