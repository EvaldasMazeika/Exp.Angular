import { IProperty } from './IProperty.model';

export interface IMyForm {
    name: string;
    _id?: string;
    items: Array<IProperty>;
}
