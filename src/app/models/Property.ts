import { TemplateOptions } from './TemplateOptions';

export interface Property {
    key?: string;
    type?: string;
    templateOptions: TemplateOptions;
    hideExpression?: string;
}
