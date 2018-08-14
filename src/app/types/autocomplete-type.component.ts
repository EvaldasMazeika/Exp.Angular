import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { MatInput } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ExpensesService } from '../services/expenses.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-autocomplete-type',
  template: `
    <input type="text" [placeholder]="to.placeholder" [formlyAttributes]="field"
     matInput [formControl]="formControl" [matAutocomplete]="auto">
    <mat-autocomplete #auto="matAutocomplete">
      <mat-option *ngFor="let option of optionss" [value]="option">
        {{option}}
      </mat-option>
    </mat-autocomplete>
    `,
})
export class AutocompleteTypeComponent extends FieldType implements OnInit {
  @ViewChild(MatInput) formFieldControl: MatInput;

  constructor(private service: ExpensesService) {
    super();
  }


  filter: Observable<any[]>;
  optionss: string[];
  ngOnInit() {
    super.ngOnInit();
    this.service.GetAutoComplete(this.field.templateOptions.formId, this.field.key).subscribe((res) => {
      this.optionss = res.items;
    });

  }
}
