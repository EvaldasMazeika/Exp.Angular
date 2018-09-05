import { Component, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { MatCheckbox, MatCheckboxChange } from '@angular/material';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'formly-field-checkbox',
    template: `
    <mat-checkbox
      [formControl]="formControl"
      [id]="id"
      [formlyAttributes]="field"
      (change)="change($event)"
      [indeterminate]="to.indeterminate || field.formControl.value === null"
      [color]="to.color"
      [labelPosition]="to.align || to.labelPosition">
      {{ to.label }}
      <ng-container *ngIf="to.required && to.hideRequiredMarker !== true">*</ng-container>
    </mat-checkbox>
    `,
   })
// tslint:disable-next-line:component-class-suffix
export class FormlyFieldCheckbox extends FieldType {
    @ViewChild(MatCheckbox) checkbox: MatCheckbox;

  constructor() {
    super();
  }

  change($event: MatCheckboxChange) {
    if (this.to.change) {
      this.to.change(this.field, $event);
    }
  }

}
