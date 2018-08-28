import { IDropDownOptions } from './IDropDownOptions.model';

export interface ITemplateOptions {
    label?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    formId?: string;
    isTime?: boolean;
    dateFormat?: string;
    isMultiFile?: boolean;
    options?: Array<IDropDownOptions>;
    isExportable?: boolean;
}
