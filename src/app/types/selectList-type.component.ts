import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { ExpensesService } from '../services/expenses.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-selectlist-type',
  template: `<ng-select [items]="selects" appendTo="body"
     [formControl]="formControl" [formlyAttributes]="field"
     [addTag]="addT" bindValue="value" bindLabel="label" (change)="onChange($event)">
    </ng-select>`
})

export class SelectListTypeComponent extends FieldType implements OnInit {

  formId: any;
  propertyName: any;

  selects = [];
  constructor(public service: ExpensesService) {
    super();
  }

  loading = false;
  ngOnInit() {
    super.ngOnInit();
    this.formId = this.options['formId'];
    this.propertyName = this.field.key;

    this.service.GetSelectList(this.formId, this.propertyName).subscribe((res) => {
      this.selects = res;
    });
  }

  addT(label) {
    return { value: label, label: label, isNew: true };
  }

  onChange($event) {
    if ($event.hasOwnProperty('isNew')) {
      this.service.AddSelectItem(this.formId, this.propertyName, { label: $event.label, value: $event.label }).subscribe();
    }
  }

}
