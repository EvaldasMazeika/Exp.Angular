import { IDropDownOptions } from './IDropDownOptions.model';

export interface ITemplateOptions {
    label?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    options?: Array<IDropDownOptions>;
}
