import { Component, OnInit } from '../../../node_modules/@angular/core';
import { FieldType } from '../../../node_modules/@ngx-formly/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'formly-field-checkbox',
    template: `
    <mat-checkbox [formControl]="formControl" [formlyAttributes]="field"
     style="display: flex">{{field.templateOptions.label}}</mat-checkbox>
    `,
   })
// tslint:disable-next-line:component-class-suffix
export class FormlyFieldCheckbox extends FieldType implements OnInit {

    ngOnInit() {
        super.ngOnInit();
      }
}
