import { Component, ViewChild, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { MatInput } from '@angular/material/input';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-field-date',
  template: `
 <mat-form-field style="width: 100%">
  <input matInput [placeholder]="to.placeholder" [formControl]="formControl" [formlyAttributes]="field" [matDatepicker]="picker">
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
 `,
})
// tslint:disable-next-line:component-class-suffix
export class FormlyFieldDate extends FieldType implements OnInit {
  @ViewChild(MatInput) formFieldControl: MatInput;
  ngOnInit() {
    if (this.field.templateOptions.isDateToday) {
      this.field.formControl.setValue(new Date());
    }
  }
}
