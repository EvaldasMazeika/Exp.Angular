import { Component, OnInit } from '../../../node_modules/@angular/core';
import { FieldType } from '../../../node_modules/@ngx-formly/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'formly-field-fileInput',
    template: `
    <mat-form-field style="width: 100%">
      <ngx-mat-file-input [placeholder]="to.placeholder" [formControl]="formControl" [formlyAttributes]="field"
       [multiple]="field.templateOptions.isMultiFile"></ngx-mat-file-input>
      <mat-icon matSuffix>attach_file</mat-icon>
    </mat-form-field>
    `,
   })
// tslint:disable-next-line:component-class-suffix
export class FormlyFieldFileInput extends FieldType implements OnInit {

    ngOnInit() {
        super.ngOnInit();
      }
}
