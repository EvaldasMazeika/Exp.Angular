import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { MatInput, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, switchMap, map } from 'rxjs/operators';
import { ExpensesService } from '../services/expenses.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-autocomplete-type',
  template: `
    <input type="text" [placeholder]="to.placeholder" [formlyAttributes]="field"
     matInput [formControl]="formControl" [matAutocomplete]="auto">
    <mat-autocomplete #auto="matAutocomplete">
      <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
        {{option}}
      </mat-option>
    </mat-autocomplete>
    `,
})
export class AutocompleteTypeComponent extends FieldType implements OnInit {
  @ViewChild('auto') formFieldControl: MatAutocomplete;
  @ViewChild(MatInput) forr;

  showPanel: boolean;

  constructor(private service: ExpensesService) {
    super();
  }

  filter: Observable<any[]>;
  optionss: string[];
  filteredOptions: Observable<string[]>;


  ngOnInit() {
    super.ngOnInit();
    this.service.GetAutoComplete(this.field.templateOptions.formId, this.field.key).subscribe((res) => {
      this.optionss = res.items;
      this.filteredOptions = this.formControl.valueChanges
        .pipe(
          startWith(''),
          map(value =>  this._filter(value))
        );
        this.formFieldControl.showPanel = false;
        this.formControl.valueChanges.subscribe((value) => {
         console.log(this.forr);
          if (value.length >= 2) {
            this.formFieldControl.showPanel = false;
            this.forr.ngControl.valueAccessor.autocomplete.showPanel = true;
          } else {

           this.formFieldControl.showPanel = false;
           this.forr.ngControl.valueAccessor.autocomplete.showPanel = false;
          }
        });
    });


  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionss.filter(option => option.toLowerCase().includes(filterValue));
  }
}
