import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-field-fileInput',
  template: `
    <mat-form-field style="width: 100%">
      <ngx-mat-file-input [placeholder]="to.label" [formControl]="formControl" [formlyAttributes]="field"
       [multiple]="field.templateOptions.isMultiFile" [required]="isRequired"></ngx-mat-file-input>
      <mat-icon matSuffix>attach_file</mat-icon>
    </mat-form-field>
    `,
})
// tslint:disable-next-line:component-class-suffix
export class FormlyFieldFileInput extends FieldType implements OnInit {

  isRequired = false;

  ngOnInit() {
    super.ngOnInit();
    if (this.to.required) {
      this.isRequired = true;
    }
  }
}
