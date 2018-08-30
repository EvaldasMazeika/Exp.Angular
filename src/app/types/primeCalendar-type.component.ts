import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'prime-calendar',
    template: `
    <div class="ui-g ui-fluid">
        <div class="ui-g-12 ui-md-12">
            <span>{{to.label}} {{isReq}}</span>
            <p-calendar [formControl]="formControl" [showTime]="isTime" [formlyAttributes]="field" [showIcon]="true"></p-calendar>
        </div>
    </div>
   `,
})

// tslint:disable-next-line:component-class-suffix
export class PrimeCalendar extends FieldType implements OnInit {
    dateFormat: any;
    isTime: boolean;
    isReq = '';

    ngOnInit() {
        this.isTime = this.field.templateOptions['isTime'];
        if (this.to.required) {
            this.isReq = '*';
        }
    }
}
