import { Component } from '../../../node_modules/@angular/core';
import { FieldType } from '../../../node_modules/@ngx-formly/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'formly-field-checkbox',
    template: `
    <mat-checkbox [formControl]="formControl" [formlyAttributes]="field">Is required?</mat-checkbox><br>
    `,
   })
// tslint:disable-next-line:component-class-suffix
export class FormlyFieldCheckbox extends FieldType {

}
