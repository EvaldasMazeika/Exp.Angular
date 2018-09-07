import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'prime-calendar',
    template: `
    <div class="ui-g ui-fluid">
        <div class="ui-g-12" style="padding-left: 0px;">
            <span [class.goodKlass]="formControl.valid"  [class.errorKlass]="!formControl.valid" style="font-size: 13px;">
            {{to.label}} {{isReq}}</span>
            <p-calendar [formControl]="formControl"
             [showTime]="isTime" [formlyAttributes]="field" [showIcon]="true"></p-calendar>
        </div>
    </div>
   `,
    styles: [`
    .errorKlass {
        color: red;
    }
    .goodKlass {
        color: rgba(0,0,0,.6);
    }
   `]
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
