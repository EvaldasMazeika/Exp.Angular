import { IProperty } from './IProperty.model';

export interface ITransferProperty {
    model: IProperty;
    isNew: boolean;
    formId: string;
    keysOfProperties?: string[];
}
