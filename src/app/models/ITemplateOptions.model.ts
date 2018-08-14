import { IDropDownOptions } from './IDropDownOptions.model';

export interface ITemplateOptions {
    label?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    formId?: string;
    isDateToday?: boolean;
    options?: Array<IDropDownOptions>;
}
