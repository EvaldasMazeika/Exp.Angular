import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ExpensesService } from '../services/expenses.service';

@Component({
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    form = new FormGroup({});
    model: any = {};
    options: FormlyFormOptions = {};
    formId: any;

    constructor(private service: ExpensesService) {
    }

    fields: FormlyFieldConfig[] = [
        {
            key: 'Select',
            type: 'select',
            templateOptions: {
                label: 'Select form',
                required: true,
                options: this.service.getForms(), // TODO: need to fetch only names with ids
                valueProp: '_id',
                labelProp: 'name'
            },
        },
    ];

    ngOnInit() {
    }

    load() {
        this.formId = this.model.Select;
    }

}
