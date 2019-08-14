import {ServiceModel} from './ServiceModel';

export class ServiceTypeModel {
    id: number;
    name: string;
    services: ServiceModel[];

    constructor(init?: Partial<ServiceTypeModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
