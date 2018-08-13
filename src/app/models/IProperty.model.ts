import { ITemplateOptions } from './ITemplateOptions.model';

export interface IProperty {
    key?: string;
    type?: string;
    templateOptions: ITemplateOptions;
    hideExpression?: string;
    defaultValue?: string;
}
