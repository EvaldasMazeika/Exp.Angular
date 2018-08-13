import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { MatInput } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'formly-autocomplete-type',
    template: `
      <input matInput
        [matAutocomplete]="auto"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [placeholder]="to.placeholder">
      <mat-autocomplete #auto="matAutocomplete">
        <mat-option *ngFor="let value of filter | async" [value]="value">
          {{ value }}
        </mat-option>
      </mat-autocomplete>
    `,
  })
  export class AutocompleteTypeComponent extends FieldType implements OnInit {
    @ViewChild(MatInput) formFieldControl: MatInput;

    filter: Observable<any[]>;

    ngOnInit() {
      super.ngOnInit();
      this.filter = this.formControl.valueChanges
        .pipe(
          startWith(''),
          switchMap(term => this.to.filter(term)),
        );
    }
  }
