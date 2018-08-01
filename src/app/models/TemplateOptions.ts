import { DropDownOptions } from './DropDownOptions';

export interface TemplateOptions {
    label?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    options?: Array<DropDownOptions>;
}
