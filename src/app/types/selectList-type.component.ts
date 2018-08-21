import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
    selector: 'formly-selectlist-type',
    template: `<ng-select [formControl]="formControl" [formlyAttributes]="field"
      [addTag]="true">
      <ng-option *ngFor="let item of to.options" 
      [value]="item.value">{{ item.label }}</ng-option>
    </ng-select>`
})

export class SelectListTypeComponent extends FieldType implements OnInit {

    constructor() {
        super();
      }

      ngOnInit() {
        super.ngOnInit();
      }

}
