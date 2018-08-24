import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FieldType } from '@ngx-formly/core';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'formly-field-customDate',
    template: `
    <angular2-date-picker [formControl]="formControl"
     [formlyAttributes]="field" [settings]="settings"></angular2-date-picker>
   `,
})
// tslint:disable-next-line:component-class-suffix
export class FormlyFieldCustomDate extends FieldType implements OnInit {

    date: Date = new Date();
    settings = {
        bigBanner: true,
        defaultOpen: false
    };

    ngOnInit() {
        this.settings['timePicker'] = this.field.templateOptions['isTime'];
        this.settings['format'] = this.field.templateOptions['dateFormat'];
        this.field.formControl.setValue(new Date());

    }
}
